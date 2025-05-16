
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralSettingsCard from "@/components/settings/GeneralSettingsCard";
import NotificationSettingsCard from "@/components/settings/NotificationSettingsCard";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  const handleSaveSettings = () => {
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التغييرات بنجاح",
      variant: "default",
    });
  };

  return (
    <MainLayout>
      <div className="animate-fade-in bg-navy-900 min-h-screen text-white">
        <div className="flex justify-between items-center mb-6 px-4 py-6 bg-navy-800 rounded-lg shadow-navy-deep">
          <h1 className="text-3xl font-bold rtl arabic text-gold">الإعدادات</h1>
          <Button 
            onClick={handleSaveSettings} 
            className="arabic bg-khair hover:bg-khair-600"
          >
            حفظ التغييرات
          </Button>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-6"
        >
          <TabsList className="mb-4 overflow-x-auto flex-nowrap w-full bg-navy-800 p-1">
            <TabsTrigger value="general" className="arabic text-white data-[state=active]:bg-khair">عام</TabsTrigger>
            <TabsTrigger value="association" className="arabic text-white data-[state=active]:bg-khair">الجمعية</TabsTrigger>
            <TabsTrigger value="sync" className="arabic text-white data-[state=active]:bg-khair">المزامنة والنسخ الاحتياطي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="animate-in fade-in-50 space-y-4 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GeneralSettingsCard />
              <NotificationSettingsCard />
            </div>
          </TabsContent>
          
          <TabsContent value="association" className="animate-in fade-in-50 px-4">
            <div className="p-6 bg-navy-800 rounded-lg shadow-navy-deep border border-navy-700">
              <h2 className="text-xl font-semibold mb-4 arabic text-gold">إعدادات الجمعية</h2>
              <p className="text-muted-foreground arabic">سيتم تفعيل هذا القسم قريباً</p>
            </div>
          </TabsContent>
          
          <TabsContent value="sync" className="animate-in fade-in-50 px-4">
            <div className="p-6 bg-navy-800 rounded-lg shadow-navy-deep border border-navy-700">
              <h2 className="text-xl font-semibold mb-4 arabic text-gold">إعدادات المزامنة والنسخ الاحتياطي</h2>
              <p className="text-muted-foreground arabic">سيتم تفعيل هذا القسم قريباً</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
