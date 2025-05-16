
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

const GeneralSettingsCard = () => {
  const { toast } = useToast();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [settings, setSettings] = useState({
    rtl: true,
    largeText: false,
  });
  
  // محاكاة استرجاع الإعدادات من التخزين المحلي
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('app_settings');
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings({
          rtl: parsedSettings.rtl ?? true,
          largeText: parsedSettings.largeText ?? false
        });
      }
    } catch (error) {
      console.error('خطأ في استرجاع الإعدادات:', error);
    }
  }, []);
  
  // حفظ الإعدادات عند تغييرها (باستثناء الوضع الداكن الذي يتم التعامل معه من خلال السياق)
  const updateSetting = (key: 'rtl' | 'largeText', value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      localStorage.setItem('app_settings', JSON.stringify({
        ...newSettings,
        darkMode: isDarkMode, // نضيف حالة الوضع الداكن من السياق
      }));
      
      // تطبيق الإعدادات
      if (key === 'largeText') {
        document.documentElement.style.fontSize = value ? '110%' : '100%';
      }
      
      toast({
        title: "تم حفظ الإعدادات",
        description: `تم تحديث ${key === 'rtl' ? 'اتجاه الواجهة' : 'حجم النص'}`,
        variant: "default",
      });
    } catch (error) {
      console.error('خطأ في حفظ الإعدادات:', error);
    }
  };

  return (
    <Card className="bg-navy-800 border-navy-700 transition-all duration-300 hover:shadow-lg dark:bg-neutral-800 dark:border-neutral-700">
      <CardHeader className="bg-gradient-to-r from-khair/10 to-transparent border-b border-navy-700 dark:border-neutral-700">
        <CardTitle className="rtl arabic text-gold flex items-center dark:text-yellow-400">
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
            checked={isDarkMode}
            onCheckedChange={toggleDarkMode}
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
