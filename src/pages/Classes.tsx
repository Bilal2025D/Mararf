
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Search, User, Users, Clock, Calendar, Plus, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const classes = [
    {
      id: 1, 
      name: "حلقة سورة البقرة",
      teacher: "أحمد محمد",
      studentsCount: 15,
      days: ["الاثنين", "الأربعاء", "الجمعة"],
      time: "بعد العصر",
      location: "القاعة الرئيسية",
      level: "advanced"
    },
    {
      id: 2, 
      name: "حلقة المبتدئين",
      teacher: "فاطمة أحمد",
      studentsCount: 12,
      days: ["السبت", "الثلاثاء", "الخميس"],
      time: "بعد المغرب",
      location: "القاعة الثانية",
      level: "beginner"
    },
    {
      id: 3, 
      name: "حلقة التجويد",
      teacher: "عبد الله خالد",
      studentsCount: 8,
      days: ["الاثنين", "الخميس"],
      time: "بعد العشاء",
      location: "القاعة الصغيرة",
      level: "intermediate"
    },
    {
      id: 4, 
      name: "حلقة حفظ الأجزاء الأخيرة",
      teacher: "عمر سعيد",
      studentsCount: 20,
      days: ["كل يوم"],
      time: "بعد الفجر",
      location: "المسجد",
      level: "beginner"
    },
  ];
  
  const getFilteredClasses = () => {
    let filtered = classes.filter(classItem => 
      classItem.name.includes(searchTerm) ||
      classItem.teacher.includes(searchTerm)
    );
    
    if (activeTab !== "all") {
      filtered = filtered.filter(classItem => classItem.level === activeTab);
    }
    
    return filtered;
  };

  return (
    <MainLayout>
      <div className="animate-fade-in p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">إدارة الحلقات</h1>
          <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            <span className="arabic">إضافة حلقة جديدة</span>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="البحث في الحلقات..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl arabic"
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4 bg-emerald-50">
            <TabsTrigger value="all" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">الكل</TabsTrigger>
            <TabsTrigger value="beginner" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">المبتدئين</TabsTrigger>
            <TabsTrigger value="advanced" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">المتقدمين</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getFilteredClasses().map(classItem => (
            <Card key={classItem.id} className="overflow-hidden transition-all duration-200 shadow hover:shadow-md">
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg rtl arabic text-emerald-800">{classItem.name}</CardTitle>
                  <div className={`rounded-full px-2 py-1 text-xs ${
                    classItem.level === 'advanced' ? 'bg-purple-100 text-purple-600' :
                    classItem.level === 'intermediate' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <span className="arabic">
                      {classItem.level === 'advanced' ? 'متقدم' : 
                       classItem.level === 'intermediate' ? 'متوسط' : 'مبتدئ'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm rtl">
                    <User className="h-4 w-4 ml-2 text-emerald-600" />
                    <span className="arabic">المعلم: {classItem.teacher}</span>
                  </div>
                  <div className="flex items-center text-sm rtl">
                    <Users className="h-4 w-4 ml-2 text-emerald-600" />
                    <span className="arabic">عدد الطلاب: {classItem.studentsCount}</span>
                  </div>
                  <div className="flex items-center text-sm rtl">
                    <Calendar className="h-4 w-4 ml-2 text-emerald-600" />
                    <span className="arabic">الأيام: {classItem.days.join(' - ')}</span>
                  </div>
                  <div className="flex items-center text-sm rtl">
                    <Clock className="h-4 w-4 ml-2 text-emerald-600" />
                    <span className="arabic">الوقت: {classItem.time}</span>
                  </div>
                  <div className="flex items-center text-sm rtl">
                    <Book className="h-4 w-4 ml-2 text-emerald-600" />
                    <span className="arabic">المكان: {classItem.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" className="text-xs arabic">
                    <Edit className="h-3 w-3 ml-1" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs text-red-600 arabic hover:bg-red-50">
                    <Trash className="h-3 w-3 ml-1" />
                    حذف
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Classes;
