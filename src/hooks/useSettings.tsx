import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [settings, setSettings] = useState<Record<string, any>>({});
  
  // Improved connection checking function
  const checkConnection = useCallback(async () => {
    try {
      // Try to fetch a small resource to confirm actual connectivity
      const response = await fetch('https://www.google.com/favicon.ico', { 
        mode: 'no-cors',
        cache: 'no-store',
        method: 'HEAD'
      });
      return true;
    } catch (error) {
      return false;
    }
  }, []);
  
  // Monitor online status with improved detection
  useEffect(() => {
    // Initial check
    const initialCheck = async () => {
      const online = await checkConnection();
      setIsOnline(online);
    };
    initialCheck();
    
    const handleStatusChange = async () => {
      const online = await checkConnection();
      setIsOnline(online);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    
    // Periodic connection check
    const intervalId = setInterval(handleStatusChange, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      clearInterval(intervalId);
    };
  }, [checkConnection]);
  
  // Load settings from Supabase on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // First try to load from localStorage
        const cachedSettings = localStorage.getItem('app_settings_cache');
        if (cachedSettings) {
          try {
            const parsedSettings = JSON.parse(cachedSettings);
            setSettings(parsedSettings);
          } catch (error) {
            console.error("Error parsing cached settings:", error);
          }
        }
        
        // If online, try to fetch from Supabase
        if (await checkConnection()) {
          const { data: session } = await supabase.auth.getSession();
          if (!session.session) return;

          const { data, error } = await supabase
            .from('user_settings')
            .select('settings')
            .eq('user_id', session.session.user.id)
            .single();
          
          if (error) {
            console.error("Error fetching settings:", error);
            return;
          }
          
          if (data) {
            // Ensure we're setting an object to our Record<string, any> state
            const serverSettings = data.settings as Record<string, any> || {};
            setSettings(serverSettings);
            
            // Update cache
            localStorage.setItem('app_settings_cache', JSON.stringify(serverSettings));
            localStorage.setItem('settings_last_synced', new Date().toISOString());
          }
        }
      } catch (error) {
        console.error("Error in fetchSettings:", error);
      }
    };
    
    fetchSettings();
  }, [isOnline, checkConnection]);
  
  const handleSaveSettings = async (settingsData = {}) => {
    setIsSaving(true);
    
    try {
      // Combine local settings (like form values) with current settings
      const syncValues = localStorage.getItem('syncSettings');
      const appSettings = localStorage.getItem('app_settings');
      
      const combinedSettings = {
        ...settings,
        syncSettings: syncValues ? JSON.parse(syncValues) : undefined,
        appSettings: appSettings ? JSON.parse(appSettings) : undefined,
        ...settingsData
      };
      
      // Always save to local storage first
      localStorage.setItem('app_settings_cache', JSON.stringify(combinedSettings));
      
      // If online and logged in, save to Supabase too
      if (isOnline) {
        const { data: session } = await supabase.auth.getSession();
        
        if (session.session) {
          // Save to Supabase
          const { error } = await supabase
            .from('user_settings')
            .upsert({
              user_id: session.session.user.id,
              settings: combinedSettings,
              updated_at: new Date().toISOString()
            });
          
          if (error) {
            throw error;
          }
          
          localStorage.setItem('settings_last_synced', new Date().toISOString());
          localStorage.setItem('pendingSync', 'false');
        } else {
          // User is not logged in, mark as pending sync
          localStorage.setItem('pendingSync', 'true');
        }
      } else {
        // We're offline, mark as pending sync
        localStorage.setItem('pendingSync', 'true');
      }
      
      setSettings(combinedSettings);
      
      toast({
        title: isOnline ? "تم الحفظ" : "تم الحفظ محليًا",
        description: isOnline 
          ? "تم حفظ التغييرات بنجاح" 
          : "تم حفظ التغييرات محليًا وسيتم مزامنتها عند الاتصال",
        variant: "default",
      });
    } catch (error: any) {
      console.error("Error saving settings:", error);
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      });
      
      if (error.message === "يجب تسجيل الدخول أولاً") {
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = "/auth";
        }, 2000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    handleSaveSettings,
    settings,
    isOnline
  };
}
