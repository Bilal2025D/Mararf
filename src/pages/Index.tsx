
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import { Users, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Check user role and redirect accordingly
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
          setIsLoading(false);
          return;
        }

        const { data } = await supabase
          .from("profiles")
          .select("app_role")
          .eq("id", session.session.user.id)
          .single();

        if (data) {
          if (data.app_role === "teacher") {
            navigate("/admin-dashboard");
          } else {
            navigate("/client-dashboard");
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [navigate]);

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
    <MainLayout>
      <div className="animate-fade-in flex flex-col p-2">
        {/* Header area with welcome message */}
        <div className="bg-white rounded-lg p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold arabic mb-2 rtl">مرحباً بك في نظام إدارة الجمعيات</h1>
          <p className="text-gray-600 mb-4 arabic rtl">
            يرجى تسجيل الدخول للوصول إلى لوحة التحكم المناسبة لدورك
          </p>
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
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
