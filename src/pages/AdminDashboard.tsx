
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Users, Calendar, FileText, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        setIsLoading(true);
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          navigate("/auth");
          return;
        }

        // Check if user has admin role
        const { data } = await supabase
          .from("profiles")
          .select("app_role")
          .eq("id", session.session.user.id)
          .single();

        if (data && data.app_role === "teacher") {
          setIsAdmin(true);
        } else {
          toast({
            title: "غير مصرح",
            description: "ليس لديك صلاحية الوصول إلى لوحة تحكم المدراء",
            variant: "destructive",
          });
          navigate("/client-dashboard");
        }
      } catch (error) {
        console.error("Error checking admin role:", error);
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout requireAuth={true}>
      <div className="animate-fade-in flex flex-col p-2">
        {/* Header area with welcome message */}
        <div className="bg-white rounded-lg p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold arabic mb-2 rtl">لوحة تحكم المدراء</h1>
          <p className="text-gray-600 mb-4 arabic rtl">مرحباً بك في لوحة تحكم المدراء</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* الأعضاء */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Users className="h-12 w-12 text-emerald-600 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الأعضاء</h2>
              <div className="text-4xl font-bold mb-2">157</div>
              <p className="text-gray-500">العدد الإجمالي</p>
            </div>
          </Card>

          {/* الحلقات */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Calendar className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الحلقات</h2>
              <div className="text-4xl font-bold mb-2">24</div>
              <p className="text-gray-500">حلقة نشطة</p>
            </div>
          </Card>
          
          {/* التقارير */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <FileText className="h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">التقارير</h2>
              <div className="text-4xl font-bold mb-2">45</div>
              <p className="text-gray-500">تقرير هذا الشهر</p>
            </div>
          </Card>
          
          {/* الإعدادات */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Settings className="h-12 w-12 text-purple-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الإعدادات</h2>
              <div className="text-4xl font-bold mb-2">8</div>
              <p className="text-gray-500">تغييرات اليوم</p>
            </div>
          </Card>
        </div>
        
        {/* Recent Activity Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold arabic mb-4 rtl">آخر النشاطات</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-3 bg-slate-50 rounded-lg rtl">
                <div className="bg-emerald-100 text-emerald-700 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  {item}
                </div>
                <div className="flex-1">
                  <p className="font-medium">تم إضافة عضو جديد</p>
                  <p className="text-sm text-gray-500">منذ {item * 10} دقائق</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Management Tools Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold arabic mb-4 rtl">أدوات الإدارة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "إدارة المستخدمين", icon: <Users className="h-6 w-6" /> },
              { title: "إدارة الحلقات", icon: <Calendar className="h-6 w-6" /> },
              { title: "إعدادات النظام", icon: <Settings className="h-6 w-6" /> },
            ].map((tool, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg flex items-center rtl">
                <div className="bg-emerald-100 text-emerald-700 rounded-full w-10 h-10 flex items-center justify-center ml-3">
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{tool.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
