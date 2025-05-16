
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function useSettings() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({});
  
  // Load settings from Supabase on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
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
          setSettings(data.settings || {});
        }
      } catch (error) {
        console.error("Error in fetchSettings:", error);
      }
    };
    
    fetchSettings();
  }, []);
  
  const handleSaveSettings = async (settingsData = {}) => {
    setIsSaving(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("يجب تسجيل الدخول أولاً");
      }
      
      // Combine local settings (like form values) with current settings
      const syncValues = localStorage.getItem('syncSettings');
      const appSettings = localStorage.getItem('app_settings');
      
      const combinedSettings = {
        ...settings,
        syncSettings: syncValues ? JSON.parse(syncValues) : undefined,
        appSettings: appSettings ? JSON.parse(appSettings) : undefined,
        ...settingsData
      };
      
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
      
      setSettings(combinedSettings);
      toast({
        title: "تم الحفظ",
        description: "تم حفظ التغييرات بنجاح",
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
    settings
  };
}
