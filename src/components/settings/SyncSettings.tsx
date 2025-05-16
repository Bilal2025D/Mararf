
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Save, CloudUpload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/useSettings";

const SyncSettings = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isSavingLocal, setIsSavingLocal] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState(false);
  const { toast } = useToast();
  const { settings } = useSettings();
  
  const syncForm = useForm({
    defaultValues: {
      autoSync: true,
      syncMembers: true,
      syncStudents: true,
      syncAttendance: true,
      saveLocalFirst: true,
    }
  });

  // Monitor online status
  useEffect(() => {
    const handleStatusChange = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      // If we're back online and there's pending data to sync
      if (online && pendingSync) {
        toast({
          title: "تم استعادة الاتصال",
          description: "يمكنك الآن مزامنة البيانات المحلية مع السيرفر",
        });
      }
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [pendingSync, toast]);

  // Load saved settings from localStorage and settings hook
  useEffect(() => {
    // Check localStorage first
    const savedSettings = localStorage.getItem('syncSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        syncForm.reset(parsedSettings);
      } catch (error) {
        console.error("Error parsing saved settings:", error);
      }
    }
    
    const lastSync = localStorage.getItem('lastSyncDate');
    if (lastSync) {
      setLastSyncDate(lastSync);
    }
    
    // Check pending sync flag
    const hasPendingSync = localStorage.getItem('pendingSync');
    setPendingSync(hasPendingSync === 'true');
    
    // Check if we have settings from Supabase
    if (settings && settings.syncSettings) {
      syncForm.reset(settings.syncSettings);
    }
    
    if (settings && settings.lastSyncDate) {
      setLastSyncDate(settings.lastSyncDate);
    }
  }, [settings, syncForm]);

  // Save form values to localStorage whenever they change
  useEffect(() => {
    const subscription = syncForm.watch((value) => {
      localStorage.setItem('syncSettings', JSON.stringify(value));
    });
    
    return () => subscription.unsubscribe();
  }, [syncForm.watch]);

  // Save data locally
  const saveLocally = async () => {
    setIsSavingLocal(true);
    
    try {
      // Get the current form values
      const formValues = syncForm.getValues();
      
      // Save to localStorage
      localStorage.setItem('syncSettings', JSON.stringify(formValues));
      
      // Save the current time as the last save date
      const now = new Date().toLocaleString('ar-SA');
      localStorage.setItem('lastLocalSaveDate', now);
      
      // Mark that we have pending data to sync
      localStorage.setItem('pendingSync', 'true');
      setPendingSync(true);
      
      setTimeout(() => {
        setIsSavingLocal(false);
        toast({
          title: "تم الحفظ محليًا",
          description: "تم حفظ البيانات على الجهاز بنجاح",
          variant: "default",
        });
      }, 500);
      
    } catch (error: any) {
      console.error("Error saving locally:", error);
      setIsSavingLocal(false);
      toast({
        title: "خطأ في الحفظ",
        description: error.message || "حدث خطأ أثناء حفظ البيانات محليًا",
        variant: "destructive",
      });
    }
  };

  const handleSyncData = async () => {
    setIsSyncing(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("يجب تسجيل الدخول أولاً");
      }
      
      // Get which data types should be synced
      const syncValues = syncForm.getValues();
      
      // Simulate syncing different types of data based on form values
      let syncedItems = [];
      
      if (syncValues.syncMembers) {
        // Here we would make actual API calls to sync members data
        console.log("Syncing members data...");
        
        // Fetch members from profiles
        const { data: members, error: membersError } = await supabase
          .from('profiles')
          .select('*');
          
        if (membersError) {
          throw membersError;
        }
        
        syncedItems.push("الأعضاء");
      }
      
      if (syncValues.syncStudents) {
        // Here we would make actual API calls to sync students data
        console.log("Syncing students data...");
        
        // Fetch students
        const { data: students, error: studentsError } = await supabase
          .from('students')
          .select('*');
          
        if (studentsError) {
          throw studentsError;
        }
        
        syncedItems.push("الطلاب");
      }
      
      if (syncValues.syncAttendance) {
        // Here we would make actual API calls to sync attendance data
        console.log("Syncing attendance data...");
        syncedItems.push("سجلات الحضور");
      }
      
      // Save the current time as the last sync date
      const now = new Date().toLocaleString('ar-SA');
      localStorage.setItem('lastSyncDate', now);
      setLastSyncDate(now);
      
      // Clear the pending sync flag
      localStorage.setItem('pendingSync', 'false');
      setPendingSync(false);
      
      // Update user settings with the new sync settings and last sync date
      const currentSettings = {
        ...settings,
        syncSettings: syncForm.getValues(),
        lastSyncDate: now
      };
      
      // Save to Supabase via our useSettings hook
      const { data: userData } = await supabase.auth.getSession();
      if (userData.session) {
        const { error: updateError } = await supabase
          .from('user_settings')
          .upsert({
            user_id: userData.session.user.id,
            settings: currentSettings,
            updated_at: new Date().toISOString()
          });
          
        if (updateError) {
          throw updateError;
        }
      }
      
      setTimeout(() => {
        setIsSyncing(false);
        toast({
          title: "تمت المزامنة",
          description: `تم مزامنة البيانات بنجاح: ${syncedItems.join('، ')}`,
          variant: "default",
        });
      }, 1200);
      
    } catch (error: any) {
      console.error("Error syncing data:", error);
      setIsSyncing(false);
      toast({
        title: "خطأ في المزامنة",
        description: error.message || "حدث خطأ أثناء مزامنة البيانات",
        variant: "destructive",
      });
      
      if (error.message === "يجب تسجيل الدخول أولاً") {
        // Redirect to login page after a short delay
        setTimeout(() => {
          window.location.href = "/auth";
        }, 2000);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
          <CardTitle className="text-lg rtl arabic text-emerald-700">خيارات المزامنة</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Form {...syncForm}>
            <form className="space-y-4 rtl arabic">
              <FormField
                control={syncForm.control}
                name="saveLocalFirst"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-emerald-100 bg-yellow-50">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">حفظ في الجهاز أولاً</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        حفظ البيانات على الجهاز أولاً ثم مزامنتها عند الاتصال
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={syncForm.control}
                name="autoSync"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-emerald-100">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">مزامنة تلقائية</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        مزامنة البيانات تلقائيًا كل ساعة
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={syncForm.control}
                name="syncMembers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-emerald-100">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">مزامنة الأعضاء</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        تضمين بيانات الأعضاء في المزامنة
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={syncForm.control}
                name="syncStudents"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-emerald-100">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">مزامنة الطلاب</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        تضمين بيانات الطلاب في المزامنة
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={syncForm.control}
                name="syncAttendance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-emerald-100">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">مزامنة سجلات الحضور</FormLabel>
                      <FormDescription className="text-sm text-muted-foreground">
                        تضمين سجلات الحضور في المزامنة
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
          <CardTitle className="text-lg rtl arabic text-emerald-700">الحفظ والمزامنة</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4 rtl arabic">
            <div className={`p-3 rounded-md ${isOnline ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
              <p className="text-sm font-medium mb-1">
                {isOnline ? 'متصل بالانترنت' : 'غير متصل بالانترنت'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isOnline 
                  ? 'يمكنك مزامنة البيانات مع السيرفر' 
                  : 'سيتم حفظ البيانات محليًا حتى استعادة الاتصال'}
              </p>
            </div>
            
            <div className="border rounded-md p-4 bg-emerald-50/50 border-emerald-100">
              <p className="text-sm mb-4">آخر مزامنة: {lastSyncDate || "لم تتم المزامنة بعد"}</p>
              {pendingSync && isOnline && (
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-md mb-4">
                  <p className="text-sm font-medium text-amber-800">
                    يوجد بيانات غير متزامنة
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    قم بالمزامنة لرفع البيانات المحفوظة محليًا إلى السيرفر
                  </p>
                </div>
              )}
              
              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={saveLocally}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isSavingLocal}
                >
                  <Save className={`ml-2 h-4 w-4 ${isSavingLocal ? 'animate-pulse' : ''}`} />
                  {isSavingLocal ? "جاري الحفظ..." : "حفظ البيانات محليًا"}
                </Button>
                
                <Button 
                  onClick={handleSyncData} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSyncing || !isOnline}
                >
                  {isOnline 
                    ? <RefreshCw className={`ml-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    : <CloudUpload className="ml-2 h-4 w-4" />
                  }
                  {isSyncing 
                    ? "جاري المزامنة..." 
                    : isOnline 
                      ? pendingSync 
                        ? "مزامنة البيانات المحلية مع السيرفر" 
                        : "مزامنة البيانات الآن"
                      : "يتطلب اتصال بالانترنت"}
                </Button>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="outline" className="border-emerald-200 text-emerald-700">
                استعادة النسخة الاحتياطية
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SyncSettings;
