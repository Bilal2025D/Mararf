
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacebookShare from '@/components/social/FacebookShare';

const Social = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-navy-700">التواصل الاجتماعي</h1>
          <img 
            src="/lovable-uploads/3c31d06b-ed65-4a68-b085-321d436f875b.png"
            alt="شعار الجمعية"
            className="h-16 w-auto"
          />
        </div>
        
        <Tabs defaultValue="facebook" className="w-full">
          <TabsList className="grid w-full grid-cols-1 h-auto rtl">
            <TabsTrigger value="facebook" className="arabic">فيسبوك</TabsTrigger>
          </TabsList>
          
          <TabsContent value="facebook" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <FacebookShare />
              
              <div className="space-y-4">
                <div className="bg-muted/40 p-6 rounded-lg border">
                  <h3 className="text-lg font-medium mb-3 rtl arabic">تعليمات المشاركة</h3>
                  <ol className="space-y-2 list-decimal list-inside rtl arabic">
                    <li>أدخل عنوان المنشور (اختياري)</li>
                    <li>اكتب محتوى المنشور الذي تريد مشاركته</li>
                    <li>اضغط على زر "مشاركة على فيسبوك"</li>
                    <li>سيتم فتح نافذة فيسبوك للمشاركة</li>
                    <li>أكمل عملية المشاركة على فيسبوك</li>
                  </ol>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Social;
