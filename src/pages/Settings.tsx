
import { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import SettingsTabs from "@/components/settings/SettingsTabs";
import { useSettings } from "@/hooks/useSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { isSaving, handleSaveSettings } = useSettings();
  
  return (
    <MainLayout>
      <div className="animate-fade-in bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6 px-4 py-6 bg-emerald-50 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">الإعدادات</h1>
          <Button 
            onClick={handleSaveSettings} 
            className="arabic bg-emerald-600 hover:bg-emerald-700"
            disabled={isSaving}
          >
            <Save className="ml-2 h-4 w-4" />
            {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
        
        <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </MainLayout>
  );
};

export default Settings;
