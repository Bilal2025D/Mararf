
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, FileText, Image } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClientDashboard = () => {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          navigate("/auth");
          return;
        }

        // Get user profile data
        const { data } = await supabase
          .from("profiles")
          .select("name, app_role")
          .eq("id", session.session.user.id)
          .single();

        if (data) {
          setUserName(data.name || "");
          
          // If user is a teacher, redirect to admin dashboard
          if (data.app_role === "teacher") {
            toast({
              title: "تم التحويل",
              description: "تم تحويلك إلى لوحة تحكم المدراء",
            });
            navigate("/admin-dashboard");
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
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
          <h1 className="text-3xl font-bold arabic mb-2 rtl">واجهة العميل</h1>
          <p className="text-gray-600 mb-4 arabic rtl">
            {userName ? `مرحباً بك ${userName}` : "مرحباً بك في واجهة العميل"}
          </p>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* الحلقات */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <Calendar className="h-12 w-12 text-amber-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الحلقات</h2>
              <div className="text-4xl font-bold mb-2">3</div>
              <p className="text-gray-500">الحلقات المسجل بها</p>
            </div>
          </Card>

          {/* الرسائل */}
          <Card className="p-6 rounded-lg bg-white border-0 shadow-sm">
            <div className="flex flex-col items-center rtl text-center">
              <MessageSquare className="h-12 w-12 text-blue-500 mb-4" />
              <h2 className="text-xl font-bold arabic mb-2">الرسائل</h2>
              <div className="text-4xl font-bold mb-2">5</div>
              <p className="text-gray-500">رسائل جديدة</p>
            </div>
          </Card>
        </div>

        {/* Upcoming Classes Section */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold arabic mb-4 rtl">الحلقات القادمة</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center p-3 bg-slate-50 rounded-lg rtl">
                <div className="bg-amber-100 text-amber-700 rounded-full w-10 h-10 flex items-center justify-center ml-3">
                  {item}
                </div>
                <div className="flex-1">
                  <p className="font-medium">حلقة القرآن - المستوى {item}</p>
                  <p className="text-sm text-gray-500">غداً - الساعة {item + 3}:00 مساءً</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Documents & Resources Section */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold arabic mb-4 rtl">المستندات والموارد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "جدول الحلقات الأسبوعي", icon: <Calendar className="h-6 w-6" />, type: "PDF" },
              { title: "الكتب المقررة", icon: <FileText className="h-6 w-6" />, type: "DOC" },
              { title: "صور الأنشطة", icon: <Image className="h-6 w-6" />, type: "JPG" },
              { title: "نتائج التقييم", icon: <FileText className="h-6 w-6" />, type: "PDF" },
            ].map((resource, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg flex items-center rtl">
                <div className="bg-blue-100 text-blue-700 rounded-full w-10 h-10 flex items-center justify-center ml-3">
                  {resource.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{resource.title}</p>
                  <p className="text-sm text-gray-500">{resource.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;
