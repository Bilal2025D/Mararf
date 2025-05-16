
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, File, Printer, Calendar } from "lucide-react";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("attendance");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedMonth, setSelectedMonth] = useState("4"); // Abril
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedWeek, setSelectedWeek] = useState("3"); // Tercera semana
  
  // Datos de ejemplo para las gráficas/reportes
  const attendanceData = {
    weekly: {
      labels: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"],
      data: [92, 87, 69, 85, 74]
    },
    monthly: {
      labels: ["الأسبوع 1", "الأسبوع 2", "الأسبوع 3", "الأسبوع 4"],
      data: [85, 78, 83, 80]
    }
  };
  
  const activitiesData = {
    weekly: {
      completed: 3,
      upcoming: 2,
      total: 5
    },
    monthly: {
      completed: 12,
      upcoming: 5,
      total: 17
    }
  };
  
  const messagesData = {
    weekly: {
      sent: 8,
      delivered: 8,
      failed: 0
    },
    monthly: {
      sent: 24,
      delivered: 22,
      failed: 2
    }
  };
  
  // Lista de informes disponibles
  const availableReports = [
    { id: "attendance", name: "تقرير الحضور والغياب", icon: <Calendar className="h-5 w-5" /> },
    { id: "activities", name: "تقرير النشاطات", icon: <Calendar className="h-5 w-5" /> },
    { id: "messages", name: "تقرير الرسائل", icon: <FileText className="h-5 w-5" /> },
    { id: "evaluation", name: "تقرير التقييم", icon: <FileText className="h-5 w-5" /> },
  ];
  
  // Función para generar PDF (simulada)
  const generatePDF = () => {
    // En una app real, esto generaría un PDF
    console.log("Generando PDF para:", selectedReport, "periodo:", selectedPeriod);
    alert("تم إنشاء ملف PDF بنجاح!");
  };
  
  // Obtener nombres de meses en árabe
  const getArabicMonths = () => {
    return [
      "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
  };
  
  // Renderizar contenido del informe
  const renderReportContent = () => {
    switch (selectedReport) {
      case "attendance":
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 rtl arabic">ملخص الحضور</h3>
              <div className="bg-card p-4 rounded-md border">
                {selectedPeriod === "week" && (
                  <div className="space-y-4">
                    {attendanceData.weekly.labels.map((day, index) => (
                      <div key={day} className="flex items-center">
                        <div className="w-20 text-right text-sm font-medium rtl arabic">{day}</div>
                        <div className="flex-1 ml-4">
                          <div className="h-3 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-khair" 
                              style={{ width: `${attendanceData.weekly.data[index]}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4 text-sm font-medium">{attendanceData.weekly.data[index]}%</div>
                      </div>
                    ))}
                    <div className="pt-2 border-t mt-4 flex justify-between rtl arabic">
                      <span className="font-medium">المتوسط الأسبوعي:</span>
                      <span className="font-bold">
                        {attendanceData.weekly.data.reduce((a, b) => a + b, 0) / attendanceData.weekly.data.length}%
                      </span>
                    </div>
                  </div>
                )}
                
                {selectedPeriod === "month" && (
                  <div className="space-y-4">
                    {attendanceData.monthly.labels.map((week, index) => (
                      <div key={week} className="flex items-center">
                        <div className="w-20 text-right text-sm font-medium rtl arabic">{week}</div>
                        <div className="flex-1 ml-4">
                          <div className="h-3 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-khair" 
                              style={{ width: `${attendanceData.monthly.data[index]}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-4 text-sm font-medium">{attendanceData.monthly.data[index]}%</div>
                      </div>
                    ))}
                    <div className="pt-2 border-t mt-4 flex justify-between rtl arabic">
                      <span className="font-medium">المتوسط الشهري:</span>
                      <span className="font-bold">
                        {attendanceData.monthly.data.reduce((a, b) => a + b, 0) / attendanceData.monthly.data.length}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 rtl arabic">التوصيات والملاحظات</h3>
              <div className="bg-card p-4 rounded-md border space-y-2 rtl arabic">
                <p>• معدل الحضور يوم الثلاثاء منخفض، يجب تحسين الحضور في هذا اليوم.</p>
                <p>• تحسن ملحوظ في حضور الطلاب خلال الأسبوع الأخير.</p>
                <p>• متوسط الحضور العام جيد، مع الحفاظ على هذا المستوى.</p>
              </div>
            </div>
          </div>
        );
        
      case "activities":
        const actData = selectedPeriod === "week" ? activitiesData.weekly : activitiesData.monthly;
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 rtl arabic">ملخص النشاطات</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center p-4">
                  <h4 className="text-sm text-muted-foreground mb-1 rtl arabic">النشاطات المكتملة</h4>
                  <div className="text-3xl font-bold text-khair">{actData.completed}</div>
                </Card>
                <Card className="text-center p-4">
                  <h4 className="text-sm text-muted-foreground mb-1 rtl arabic">النشاطات القادمة</h4>
                  <div className="text-3xl font-bold text-khair-accent">{actData.upcoming}</div>
                </Card>
                <Card className="text-center p-4">
                  <h4 className="text-sm text-muted-foreground mb-1 rtl arabic">إجمالي النشاطات</h4>
                  <div className="text-3xl font-bold">{actData.total}</div>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 rtl arabic">تحليل النشاطات</h3>
              <div className="bg-card p-4 rounded-md border rtl arabic space-y-2">
                <p>• نشاط "درس تحفيظ" سجل أعلى معدل حضور بنسبة 92%.</p>
                <p>• هناك اهتمام كبير بالنشاطات الثقافية مقارنة بالنشاطات التعليمية.</p>
                <p>• اقتراح: زيادة عدد النشاطات التفاعلية لزيادة مشاركة الطلاب.</p>
              </div>
            </div>
          </div>
        );
        
      case "messages":
        const msgData = selectedPeriod === "week" ? messagesData.weekly : messagesData.monthly;
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 rtl arabic">ملخص الرسائل</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center p-4">
                  <h4 className="text-sm text-muted-foreground mb-1 rtl arabic">الرسائل المرسلة</h4>
                  <div className="text-3xl font-bold">{msgData.sent}</div>
                </Card>
                <Card className="text-center p-4">
                  <h4 className="text-sm text-muted-foreground mb-1 rtl arabic">تم التوصيل</h4>
                  <div className="text-3xl font-bold text-green-600">{msgData.delivered}</div>
                </Card>
                <Card className="text-center p-4">
                  <h4 className="text-sm text-muted-foreground mb-1 rtl arabic">فشل الإرسال</h4>
                  <div className="text-3xl font-bold text-red-600">{msgData.failed}</div>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 rtl arabic">تحليل الرسائل</h3>
              <div className="bg-card p-4 rounded-md border rtl arabic space-y-2">
                <p>• معدل توصيل الرسائل: {(msgData.delivered / msgData.sent * 100).toFixed(1)}%</p>
                <p>• معظم الرسائل كانت تذكيرات بالنشاطات القادمة.</p>
                <p>• هناك {msgData.failed} رسائل لم يتم توصيلها بسبب أرقام غير صحيحة.</p>
              </div>
            </div>
          </div>
        );
        
      case "evaluation":
        return (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 rtl arabic">التقييم العام</h3>
              <div className="bg-card p-4 rounded-md border rtl arabic">
                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold ml-2">التقدم العلمي:</div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((star) => (
                      <svg 
                        key={star} 
                        className="w-6 h-6 fill-khair-accent" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <svg 
                      className="w-6 h-6 fill-muted stroke-muted-foreground" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <div className="text-xl font-bold ml-2">السلوك والانضباط:</div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className="w-6 h-6 fill-khair-accent" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-xl font-bold ml-2">المشاركة في النشاطات:</div>
                  <div className="flex items-center">
                    {[1, 2, 3].map((star) => (
                      <svg 
                        key={star} 
                        className="w-6 h-6 fill-khair-accent" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    {[4, 5].map((star) => (
                      <svg 
                        key={star} 
                        className="w-6 h-6 fill-muted stroke-muted-foreground" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 rtl arabic">ملاحظات وتوصيات</h3>
              <div className="bg-card p-4 rounded-md border rtl arabic space-y-2">
                <p>• هناك تحسن ملحوظ في المستوى العلمي للطلاب مقارنة بالفترة السابقة.</p>
                <p>• مستوى الانضباط والسلوك ممتاز ويجب الحفاظ عليه.</p>
                <p>• يوصى بتشجيع الطلاب على المشاركة في المزيد من النشاطات الثقافية.</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div className="text-center py-8 text-muted-foreground">الرجاء اختيار نوع التقرير</div>;
    }
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic">التقارير</h1>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              <span className="arabic">طباعة</span>
            </Button>
            <Button 
              className="khair-btn-primary" 
              onClick={generatePDF}
            >
              <File className="mr-2 h-4 w-4" />
              <span className="arabic">تصدير PDF</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="rtl arabic">خيارات التقرير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 rtl arabic">نوع التقرير</label>
                  <Select value={selectedReport} onValueChange={setSelectedReport}>
                    <SelectTrigger className="w-full rtl arabic">
                      <SelectValue placeholder="اختر نوع التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableReports.map(report => (
                        <SelectItem key={report.id} value={report.id}>
                          <div className="flex items-center rtl">
                            {report.icon}
                            <span className="mr-2 arabic">{report.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 rtl arabic">الفترة الزمنية</label>
                  <Tabs defaultValue="week" value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
                    <TabsList className="grid grid-cols-2 mb-2">
                      <TabsTrigger value="week" className="arabic">أسبوعي</TabsTrigger>
                      <TabsTrigger value="month" className="arabic">شهري</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {selectedPeriod === "week" && (
                  <div>
                    <label className="block text-sm font-medium mb-2 rtl arabic">الأسبوع</label>
                    <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                      <SelectTrigger className="w-full rtl arabic">
                        <SelectValue placeholder="اختر الأسبوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">الأسبوع الأول</SelectItem>
                        <SelectItem value="2">الأسبوع الثاني</SelectItem>
                        <SelectItem value="3">الأسبوع الثالث</SelectItem>
                        <SelectItem value="4">الأسبوع الرابع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-2 rtl arabic">الشهر والسنة</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-full rtl arabic">
                        <SelectValue placeholder="الشهر" />
                      </SelectTrigger>
                      <SelectContent>
                        {getArabicMonths().map((month, index) => (
                          <SelectItem key={index} value={String(index + 1)}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-full rtl arabic">
                        <SelectValue placeholder="السنة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="rtl arabic">
                {availableReports.find(r => r.id === selectedReport)?.name || "التقرير"} - 
                {selectedPeriod === "week" ? ` الأسبوع ${selectedWeek}، ` : " "} 
                {getArabicMonths()[parseInt(selectedMonth) - 1]} {selectedYear}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderReportContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
