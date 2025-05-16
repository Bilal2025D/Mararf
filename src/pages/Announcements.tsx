
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Calendar, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const announcements = [
    {
      id: 1, 
      title: "حفل توزيع الجوائز",
      content: "سيقام حفل توزيع الجوائز للطلاب المتفوقين يوم الخميس القادم الساعة السابعة مساءً",
      date: "2025-05-10",
      type: "event",
      audience: "all"
    },
    {
      id: 2, 
      title: "تغيير موعد الدروس",
      content: "نود إعلام جميع الطلاب بتغيير موعد دروس التجويد لتكون يوم الاثنين بدلاً من يوم الأربعاء",
      date: "2025-05-05",
      type: "schedule",
      audience: "students"
    },
    {
      id: 3, 
      title: "اجتماع المعلمين",
      content: "سيعقد اجتماع المعلمين الشهري يوم السبت القادم بعد صلاة العصر مباشرة",
      date: "2025-05-08",
      type: "meeting",
      audience: "teachers"
    },
    {
      id: 4, 
      title: "رحلة طلابية",
      content: "تنظم الجمعية رحلة طلابية إلى معرض الكتاب يوم الجمعة القادم، يرجى التسجيل لدى الإدارة",
      date: "2025-05-15",
      type: "event",
      audience: "students"
    }
  ];
  
  const getFilteredAnnouncements = () => {
    let filtered = announcements.filter(announcement => 
      announcement.title.includes(searchTerm) ||
      announcement.content.includes(searchTerm)
    );
    
    if (activeTab !== "all") {
      filtered = filtered.filter(announcement => announcement.audience === activeTab || announcement.type === activeTab);
    }
    
    return filtered;
  };

  return (
    <MainLayout>
      <div className="animate-fade-in p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">الإعلانات</h1>
          <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700">
            <Megaphone className="mr-2 h-4 w-4" />
            <span className="arabic">إضافة إعلان جديد</span>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="البحث في الإعلانات..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl arabic"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4 bg-emerald-50">
            <TabsTrigger value="all" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">الكل</TabsTrigger>
            <TabsTrigger value="event" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">فعاليات</TabsTrigger>
            <TabsTrigger value="students" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">طلاب</TabsTrigger>
            <TabsTrigger value="teachers" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">معلمين</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getFilteredAnnouncements().map(announcement => (
            <Card key={announcement.id} className="overflow-hidden transition-all duration-200 shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg rtl arabic text-emerald-800">{announcement.title}</CardTitle>
                  <div className={`rounded-full p-2 ${
                    announcement.type === 'event' ? 'bg-purple-100 text-purple-600' :
                    announcement.type === 'schedule' ? 'bg-blue-100 text-blue-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {announcement.type === 'event' && <Calendar className="h-4 w-4" />}
                    {announcement.type === 'schedule' && <Calendar className="h-4 w-4" />}
                    {announcement.type === 'meeting' && <Users className="h-4 w-4" />}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="rtl arabic text-gray-600 mb-4">{announcement.content}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="rtl arabic text-gray-500">
                    {new Date(announcement.date).toLocaleDateString('ar-SA')}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-xs arabic">تعديل</Button>
                    <Button variant="outline" size="sm" className="text-xs text-red-600 arabic hover:bg-red-50">حذف</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Announcements;
