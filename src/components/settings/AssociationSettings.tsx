
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LogoUpload from '@/components/ui/LogoUpload';
import { useSettings } from "@/hooks/useSettings";
import { supabase } from "@/integrations/supabase/client";

const AssociationSettings = () => {
  const [associationData, setAssociationData] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
  });
  const { settings } = useSettings();

  // Load association data from settings when component mounts
  useEffect(() => {
    if (settings && settings.association) {
      setAssociationData(settings.association);
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAssociationData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Store changes to localStorage temporarily (will be saved to Supabase when user clicks Save button)
    const updatedSettings = {
      ...settings,
      association: {
        ...associationData,
        [name]: value
      }
    };
    localStorage.setItem('app_settings', JSON.stringify(updatedSettings));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
          <CardTitle className="text-lg rtl arabic text-emerald-700">معلومات الجمعية</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form className="space-y-4 rtl arabic">
            <div className="space-y-2">
              <label className="text-sm font-medium">اسم الجمعية</label>
              <Input 
                name="name"
                value={associationData.name}
                onChange={handleChange}
                placeholder="اسم الجمعية"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">وصف الجمعية</label>
              <Textarea 
                name="description"
                value={associationData.description}
                onChange={handleChange}
                placeholder="وصف مختصر عن الجمعية"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">العنوان</label>
              <Input 
                name="address"
                value={associationData.address}
                onChange={handleChange}
                placeholder="عنوان الجمعية"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">رقم الهاتف</label>
                <Input 
                  name="phone"
                  value={associationData.phone}
                  onChange={handleChange}
                  placeholder="رقم الهاتف"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">البريد الإلكتروني</label>
                <Input 
                  name="email"
                  value={associationData.email}
                  onChange={handleChange}
                  placeholder="البريد الإلكتروني"
                  type="email"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-transparent border-b border-emerald-100">
          <CardTitle className="text-lg rtl arabic text-emerald-700">شعار الجمعية</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <LogoUpload />
        </CardContent>
      </Card>
    </div>
  );
};

export default AssociationSettings;
