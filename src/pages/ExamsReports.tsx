
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, Download, FileUp, BarChart, PieChart, Users, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const ExamsReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("exams");
  
  const exams = [
    {
      id: 1, 
      title: "امتحان نهاية الفصل الأول",
      date: "2025-05-20",
      students: 45,
      type: "final"
    },
    {
      id: 2, 
      title: "امتحان أجزاء عم",
      date: "2025-05-10",
      students: 28,
      type: "quran"
    },
    {
      id: 3, 
      title: "امتحان التجويد",
      date: "2025-05-05",
      students: 32,
      type: "tajweed"
    },
  ];
  
  const reports = [
    {
      id: 1, 
      title: "تقرير نسبة الحضور الشهري",
      date: "2025-04-30",
      type: "attendance",
      format: "pdf"
    },
    {
      id: 2, 
      title: "تقرير درجات الطلاب للفصل الأول",
      date: "2025-04-25",
      type: "grades",
      format: "excel"
    },
    {
      id: 3, 
      title: "تقرير التقييم العام للحلقات",
      date: "2025-04-20",
      type: "evaluation",
      format: "pdf"
    },
  ];
  
  const getFilteredItems = () => {
    if (activeTab === "exams") {
      return exams.filter(exam => 
        exam.title.includes(searchTerm)
      );
    } else {
      return reports.filter(report => 
        report.title.includes(searchTerm)
      );
    }
  };

  return (
    <MainLayout>
      <div className="animate-fade-in p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">الامتحانات والتقارير</h1>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <FileUp className="mr-2 h-4 w-4" />
              <span className="arabic">إنشاء امتحان جديد</span>
            </Button>
            <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
              <FileText className="mr-2 h-4 w-4" />
              <span className="arabic">إنشاء تقرير جديد</span>
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="البحث..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl arabic"
            />
          </div>
        </div>

        <Tabs defaultValue="exams" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4 bg-emerald-50">
            <TabsTrigger value="exams" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">الامتحانات</TabsTrigger>
            <TabsTrigger value="reports" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">التقارير</TabsTrigger>
          </TabsList>
          
          <TabsContent value="exams">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredItems().map(exam => (
                <Card key={exam.id} className="overflow-hidden transition-all duration-200 shadow hover:shadow-md">
                  <CardHeader className="pb-2 border-b">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg rtl arabic text-emerald-800">{exam.title}</CardTitle>
                      <div className={`rounded-full p-1 ${
                        exam.type === 'final' ? 'bg-blue-100 text-blue-600' :
                        exam.type === 'quran' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <FileText className="h-4 w-4" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm rtl">
                        <Calendar className="h-4 w-4 ml-2 text-emerald-600" />
                        <span className="arabic">التاريخ: {new Date(exam.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="flex items-center text-sm rtl">
                        <Users className="h-4 w-4 ml-2 text-emerald-600" />
                        <span className="arabic">عدد الطلاب: {exam.students}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm" className="text-xs arabic">
                        عرض النتائج
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs arabic">
                        تعديل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredItems().map(report => (
                <Card key={report.id} className="overflow-hidden transition-all duration-200 shadow hover:shadow-md">
                  <CardHeader className="pb-2 border-b">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg rtl arabic text-emerald-800">{report.title}</CardTitle>
                      <div className={`rounded-full p-1 ${
                        report.type === 'attendance' ? 'bg-blue-100 text-blue-600' :
                        report.type === 'grades' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {report.type === 'attendance' && <BarChart className="h-4 w-4" />}
                        {report.type === 'grades' && <FileText className="h-4 w-4" />}
                        {report.type === 'evaluation' && <PieChart className="h-4 w-4" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm rtl">
                        <Calendar className="h-4 w-4 ml-2 text-emerald-600" />
                        <span className="arabic">التاريخ: {new Date(report.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <div className="flex items-center text-sm rtl">
                        <FileText className="h-4 w-4 ml-2 text-emerald-600" />
                        <span className="arabic">النوع: {
                          report.format === 'pdf' ? 'PDF' : 'Excel'
                        }</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs arabic">
                        <Download className="h-3 w-3 ml-1" />
                        تحميل التقرير
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg rtl arabic text-emerald-800">إنشاء تقرير مخصص</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium rtl arabic block mb-2">نوع التقرير</label>
                <Select>
                  <SelectTrigger className="rtl arabic">
                    <SelectValue placeholder="اختر نوع التقرير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attendance">تقرير الحضور</SelectItem>
                    <SelectItem value="grades">تقرير الدرجات</SelectItem>
                    <SelectItem value="evaluation">تقرير التقييم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium rtl arabic block mb-2">الفترة الزمنية</label>
                <Select>
                  <SelectTrigger className="rtl arabic">
                    <SelectValue placeholder="اختر الفترة الزمنية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">أسبوعي</SelectItem>
                    <SelectItem value="month">شهري</SelectItem>
                    <SelectItem value="semester">فصلي</SelectItem>
                    <SelectItem value="year">سنوي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium rtl arabic block mb-2">تنسيق التقرير</label>
                <Select>
                  <SelectTrigger className="rtl arabic">
                    <SelectValue placeholder="اختر تنسيق التقرير" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <FileText className="mr-2 h-4 w-4" />
                <span className="arabic">إنشاء التقرير</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ExamsReports;
