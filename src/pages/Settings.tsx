
import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Save, Wifi, WifiOff } from "lucide-react";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { useSettings } from "@/hooks/useSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { isSaving, handleSaveSettings, isOnline } = useSettings();
  
  return (
    <MainLayout>
      <div className="animate-fade-in bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6 px-4 py-6 bg-emerald-50 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold rtl arabic text-emerald-700">الإعدادات</h1>
            <div className={`mt-2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium inline-flex ${
              isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3 mr-1" />
                  <span>متصل بالانترنت - سيتم حفظ التغييرات محليًا وعلى السيرفر</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 mr-1" />
                  <span>غير متصل بالانترنت - سيتم حفظ التغييرات محليًا فقط</span>
                </>
              )}
            </div>
          </div>
          <Button 
            onClick={handleSaveSettings} 
            className="arabic bg-emerald-600 hover:bg-emerald-700"
            disabled={isSaving}
          >
            <Save className="ml-2 h-4 w-4" />
            {isSaving ? "جاري الحفظ..." : isOnline ? "حفظ التغييرات" : "حفظ محليًا"}
          </Button>
        </div>
        
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </MainLayout>
  );
};

export default Settings;
