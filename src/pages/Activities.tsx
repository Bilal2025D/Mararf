
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Plus, Users, ChevronRight, Edit, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Activities = () => {
  // Estados para filtrado
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());
  const [filterYear, setFilterYear] = useState(new Date().getFullYear());
  
  // Actividades de ejemplo
  const activities = [
    {
      id: 1,
      title: "درس تحفيظ",
      date: new Date(2025, 3, 26, 16, 0),
      location: "قاعة الدراسة الرئيسية",
      status: "confirmed",
      attendees: 24,
      description: "تحفيظ سورة الملك للمجموعة الأولى"
    },
    {
      id: 2,
      title: "حلقة تلاوة",
      date: new Date(2025, 3, 28, 14, 30),
      location: "قاعة الاجتماعات",
      status: "pending",
      attendees: 18,
      description: "مراجعة سور الجزء الثلاثين"
    },
    {
      id: 3,
      title: "اجتماع أولياء الأمور",
      date: new Date(2025, 3, 30, 18, 0),
      location: "القاعة الكبرى",
      status: "invitations",
      attendees: 45,
      description: "مناقشة خطة النشاطات للفصل القادم"
    },
    {
      id: 4,
      title: "مسابقة التجويد",
      date: new Date(2025, 4, 10, 15, 0),
      location: "قاعة الاحتفالات",
      status: "confirmed",
      attendees: 32,
      description: "المسابقة الشهرية لتجويد القرآن الكريم"
    },
  ];
  
  // Filtrar las actividades por mes y año
  const filteredActivities = activities.filter(activity => 
    activity.date.getMonth() === filterMonth && 
    activity.date.getFullYear() === filterYear
  );
  
  // Obtener nombres de los meses en árabe
  const getArabicMonths = () => {
    const months = [
      "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    return months;
  };
  
  // Formatear fecha y hora
  const formatDateTime = (date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Obtener clases de color según el estado
  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-green-500">مؤكد</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">قيد التأكيد</Badge>;
      case 'invitations':
        return <Badge className="bg-blue-500">تم إرسال الدعوات</Badge>;
      default:
        return <Badge className="bg-gray-500">غير محدد</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic">النشاطات</h1>
          <Button className="khair-btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            <span className="arabic">نشاط جديد</span>
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg rtl arabic">تقويم النشاطات</CardTitle>
              <div className="flex space-x-2">
                <select 
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(parseInt(e.target.value))}
                  className="bg-white border rounded-md px-2 py-1 text-sm"
                >
                  {getArabicMonths().map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(parseInt(e.target.value))}
                  className="bg-white border rounded-md px-2 py-1 text-sm"
                >
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                </select>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium rtl arabic">لا توجد نشاطات في هذا الشهر</h3>
              <p className="text-muted-foreground rtl arabic">قم بإضافة نشاط جديد لهذا الشهر</p>
            </div>
          ) : (
            filteredActivities.map(activity => (
              <Card key={activity.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-khair text-white p-6 md:w-48 flex items-center justify-center flex-col">
                      <div className="text-xl font-bold">{activity.date.getDate()}</div>
                      <div className="text-khair-accent">
                        {getArabicMonths()[activity.date.getMonth()]}
                      </div>
                      <div className="text-sm mt-2">
                        {activity.date.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold rtl arabic">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground rtl arabic">{activity.location}</p>
                        </div>
                        <div className="rtl arabic">{getStatusBadge(activity.status)}</div>
                      </div>
                      <p className="mt-3 rtl arabic">{activity.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-muted-foreground rtl arabic">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{activity.attendees} مشارك</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            <span className="arabic">تعديل</span>
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                            <Trash className="h-4 w-4 mr-1" />
                            <span className="arabic">حذف</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Activities;
