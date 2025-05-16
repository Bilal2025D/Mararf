
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const GeneralSettingsCard = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    darkMode: false,
    rtl: true,
    largeText: false,
  });
  
  // محاكاة استرجاع الإعدادات من التخزين المحلي
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('app_settings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error('خطأ في استرجاع الإعدادات:', error);
    }
  }, []);
  
  // حفظ الإعدادات عند تغييرها
  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      localStorage.setItem('app_settings', JSON.stringify(newSettings));
      toast({
        title: "تم حفظ الإعدادات",
        description: `تم تحديث ${key === 'darkMode' ? 'الوضع الداكن' : key === 'rtl' ? 'اتجاه الواجهة' : 'حجم النص'}`,
        variant: "default",
      });
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error);
    }
  };

  return (
    <Card className="bg-navy-800 border-navy-700 transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-khair/10 to-transparent border-b border-navy-700">
        <CardTitle className="rtl arabic text-gold flex items-center">
          <span className="islamic-icon ml-2">☪</span>
          المظهر
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between rtl islamic-pattern-bg">
          <Label htmlFor="dark-mode" className="arabic text-white flex items-center">
            الوضع الداكن
          </Label>
          <Switch 
            id="dark-mode" 
            checked={settings.darkMode}
            onCheckedChange={(checked) => updateSetting('darkMode', checked)}
            className="data-[state=checked]:bg-khair"
          />
        </div>
        <div className="flex items-center justify-between rtl islamic-pattern-bg">
          <Label htmlFor="rtl" className="arabic text-white flex items-center">
            واجهة من اليمين لليسار
          </Label>
          <Switch 
            id="rtl" 
            checked={settings.rtl}
            onCheckedChange={(checked) => updateSetting('rtl', checked)}
            className="data-[state=checked]:bg-khair"
          />
        </div>
        <div className="flex items-center justify-between rtl islamic-pattern-bg">
          <Label htmlFor="large-text" className="arabic text-white flex items-center">
            نص كبير
          </Label>
          <Switch 
            id="large-text" 
            checked={settings.largeText}
            onCheckedChange={(checked) => updateSetting('largeText', checked)}
            className="data-[state=checked]:bg-khair"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettingsCard;
