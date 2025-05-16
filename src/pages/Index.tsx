
import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { Users, Calendar } from "lucide-react";

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout>
      <div className="animate-fade-in flex flex-col p-2">
        {/* Header area with welcome message */}
        <div className="bg-white rounded-lg p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold arabic mb-2 rtl">لوحة التحكم</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* الأعضاء */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Users className="h-16 w-16 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الأعضاء</h2>
              <div className="text-6xl font-bold mb-2">157</div>
              <p className="text-gray-500">العدد الإجمالي</p>
            </div>
          </Card>

          {/* معدل الحضور */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Calendar className="h-16 w-16 text-amber-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">معدل الحضور</h2>
              <div className="text-6xl font-bold mb-2">78%</div>
              <p className="text-gray-500">متوسط الحضور</p>
            </div>
          </Card>
          
          {/* الطلاب النشطين */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Users className="h-16 w-16 text-blue-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الطلاب النشطين</h2>
              <div className="text-6xl font-bold mb-2">12</div>
              <p className="text-gray-500">طالب مسجل حاليًا</p>
            </div>
          </Card>
          
          {/* الحلقات */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Calendar className="h-16 w-16 text-purple-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الحلقات</h2>
              <div className="text-6xl font-bold mb-2">24</div>
              <p className="text-gray-500">حلقة نشطة</p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
