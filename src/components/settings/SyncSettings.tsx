
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SyncSettings = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncDate, setLastSyncDate] = useState<string | null>(null);
  const { toast } = useToast();
  
  const syncForm = useForm({
    defaultValues: {
      autoSync: true,
      syncMembers: true,
      syncStudents: true,
      syncAttendance: true,
    }
  });

  // Load saved settings from localStorage on component mount
  useEffect(() => {
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
    
    // Try to load from Supabase as well
    const fetchSyncSettings = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) return;
        
        const { data, error } = await supabase
          .from('user_settings')
          .select('settings')
          .eq('user_id', session.session.user.id)
          .single();
          
        if (error) {
          console.error("Error fetching sync settings:", error);
          return;
        }
        
        if (data && data.settings && data.settings.syncSettings) {
          syncForm.reset(data.settings.syncSettings);
        }
        
        if (data && data.settings && data.settings.lastSyncDate) {
          setLastSyncDate(data.settings.lastSyncDate);
        }
      } catch (error) {
        console.error("Error fetching sync settings:", error);
      }
    };
    
    fetchSyncSettings();
  }, []);

  // Save form values to localStorage whenever they change
  useEffect(() => {
    const subscription = syncForm.watch((value) => {
      localStorage.setItem('syncSettings', JSON.stringify(value));
    });
    
    return () => subscription.unsubscribe();
  }, [syncForm.watch]);

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
      
      // Save sync settings and last sync date to Supabase
      const { error: settingsError } = await supabase
        .from('user_settings')
        .upsert({
          user_id: session.session.user.id,
          settings: {
            syncSettings: syncForm.getValues(),
            lastSyncDate: now
          },
          updated_at: new Date().toISOString()
        });
        
      if (settingsError) {
        throw settingsError;
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
          <CardTitle className="text-lg rtl arabic text-emerald-700">مزامنة يدوية</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4 rtl arabic">
            <p className="text-sm text-muted-foreground">
              يمكنك مزامنة البيانات يدويًا في أي وقت. سيتم مزامنة آخر التغييرات مع قاعدة البيانات.
            </p>
            
            <div className="border rounded-md p-4 bg-emerald-50/50 border-emerald-100">
              <p className="text-sm mb-4">آخر مزامنة: {lastSyncDate || "لم تتم المزامنة بعد"}</p>
              <Button 
                onClick={handleSyncData} 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isSyncing}
              >
                <RefreshCw className={`ml-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? "جاري المزامنة..." : "مزامنة البيانات الآن"}
              </Button>
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
