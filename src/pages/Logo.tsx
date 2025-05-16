
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LogoUpload from '@/components/ui/LogoUpload';

const LogoPage = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 rtl arabic">شعار الجمعية</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="rtl arabic">تحميل أو تغيير شعار الجمعية</CardTitle>
          </CardHeader>
          <CardContent>
            <LogoUpload />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LogoPage;
