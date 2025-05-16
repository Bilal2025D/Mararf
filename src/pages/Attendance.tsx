import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("all");
  
  const students = [
    { id: 1, name: "عمر علي", status: "present", type: "student" },
    { id: 2, name: "سارة عبد الله", status: "absent", type: "student" },
    { id: 3, name: "خالد محمود", status: "present", type: "student" },
    { id: 4, name: "نورة سعد", status: "present", type: "student" },
    { id: 5, name: "محمد عبد العزيز", status: "present", type: "student" },
    { id: 6, name: "لمى صالح", status: "late", type: "student" },
  ];
  
  const teachers = [
    { id: 101, name: "أحمد محمد", status: "present", type: "teacher" },
    { id: 102, name: "فاطمة أحمد", status: "present", type: "teacher" },
  ];

  const getFilteredAttendance = () => {
    const allMembers = [...teachers, ...students];
    
    if (activeTab === "all") return allMembers;
    if (activeTab === "teachers") return teachers;
    if (activeTab === "students") return students;
    if (activeTab === "present") return allMembers.filter(m => m.status === "present");
    if (activeTab === "absent") return allMembers.filter(m => m.status === "absent");
    
    return allMembers;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleToggleStatus = (id) => {
    console.log(`Cambiando estado de asistencia para ID: ${id}`);
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-navy-700">سجل الحضور</h1>
          <Button 
            className="bg-gold hover:bg-gold-600 text-white rtl arabic shadow-gold-soft transition-all duration-300"
          >
            <Calendar className="ml-2 h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
        
        <Card className="mb-6 border-gold/20 shadow-gold-soft hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-3 bg-gradient-to-r from-navy-50 to-transparent border-b border-gold/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg rtl arabic text-navy-600">يوم الحضور</CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gold/20 text-navy-600 hover:bg-gold-50"
                  onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
                >
                  السابق
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-gold/20 text-navy-600 hover:bg-gold-50"
                  onClick={() => setSelectedDate(new Date())}
                >
                  اليوم
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-gold/20 text-navy-600 hover:bg-gold-50"
                  onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
                >
                  التالي
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold rtl arabic text-navy-700">{formatDate(selectedDate)}</h2>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-5 mb-4 bg-navy-50/50 p-1">
            <TabsTrigger 
              value="all" 
              className="arabic data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              الكل
            </TabsTrigger>
            <TabsTrigger 
              value="teachers" 
              className="arabic data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              الأساتذة
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="arabic data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              التلاميذ
            </TabsTrigger>
            <TabsTrigger 
              value="present" 
              className="arabic data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              الحاضرين
            </TabsTrigger>
            <TabsTrigger 
              value="absent" 
              className="arabic data-[state=active]:bg-gold data-[state=active]:text-white"
            >
              الغائبين
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Card className="border-navy/20 shadow-navy-deep overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy-50/50">
                <tr>
                  <th className="py-3 px-4 text-right rtl arabic text-navy-700">الاسم</th>
                  <th className="py-3 px-4 text-right rtl arabic text-navy-700">النوع</th>
                  <th className="py-3 px-4 text-right rtl arabic text-navy-700">الحضور</th>
                  <th className="py-3 px-4 text-right rtl arabic text-navy-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredAttendance().map((member, index) => (
                  <tr key={member.id} 
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-navy-50/10'
                    } hover:bg-navy-50/20 transition-colors`}
                  >
                    <td className="py-3 px-4 rtl arabic text-navy-700">{member.name}</td>
                    <td className="py-3 px-4 rtl arabic text-navy-600">
                      {member.type === 'teacher' ? 'أستاذ/ة' : 'تلميذ/ة'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center rtl arabic">
                        {member.status === 'present' && (
                          <span className="inline-flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            حاضر
                          </span>
                        )}
                        {member.status === 'absent' && (
                          <span className="inline-flex items-center text-red-600">
                            <XCircle className="h-4 w-4 mr-1" />
                            غائب
                          </span>
                        )}
                        {member.status === 'late' && (
                          <span className="inline-flex items-center text-amber-600">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            متأخر
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex flex-wrap gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                          onClick={() => handleToggleStatus(member.id)}
                        >
                          حاضر
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
                          onClick={() => handleToggleStatus(member.id)}
                        >
                          متأخر
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                          onClick={() => handleToggleStatus(member.id)}
                        >
                          غائب
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Attendance;
