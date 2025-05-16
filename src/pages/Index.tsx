
import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { Users, Calendar, FileText, UserCheck, Bell, Star, Megaphone, Smartphone, Book, BookOpenCheck, MessageCircle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: "الأعضاء",
      icon: <Users className="h-6 w-6 text-green-600" />,
      path: "/members",
      bgColor: "icon-circle-success"
    },
    {
      title: "سجل الحضور",
      icon: <UserCheck className="h-6 w-6 text-blue-600" />,
      path: "/attendance",
      bgColor: "icon-circle-primary"
    },
    {
      title: "تقييم الطلاب",
      icon: <Star className="h-6 w-6 text-amber-600" />,
      path: "/student-evaluation",
      bgColor: "icon-circle-warning"
    },
    {
      title: "الإعلانات",
      icon: <Megaphone className="h-6 w-6 text-purple-600" />,
      path: "/announcements",
      bgColor: "icon-circle-purple"
    },
    {
      title: "رسائل SMS",
      icon: <Smartphone className="h-6 w-6 text-pink-600" />,
      path: "/sms",
      bgColor: "icon-circle-pink"
    },
    {
      title: "إدارة الحلقات",
      icon: <Book className="h-6 w-6 text-emerald-600" />,
      path: "/classes",
      bgColor: "icon-circle-emerald"
    },
    {
      title: "التقارير",
      icon: <FileText className="h-6 w-6 text-yellow-600" />,
      path: "/exams-reports",
      bgColor: "icon-circle-yellow"
    },
    {
      title: "محادثات الأهالي",
      icon: <MessageCircle className="h-6 w-6 text-cyan-600" />,
      path: "/parent-chat",
      bgColor: "icon-circle-cyan"
    }
  ];

  return (
    <MainLayout>
      <div className="animate-fade-in space-y-6 p-4">
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="rtl text-overlay">
              <h1 className="text-xl font-bold arabic mb-1">مرحباً بك في</h1>
              <h2 className="text-2xl font-bold arabic">مطالع العلوم والمعارف</h2>
            </div>
            <div className="rounded-full bg-emerald-400/20 p-3">
              <Bell className="h-6 w-6" />
            </div>
          </div>
          <div className="text-sm opacity-90 arabic text-right text-overlay">
            اليوم: {new Date().toLocaleDateString('ar-SA')}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className="menu-card rtl text-overlay bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-3"
            >
              <div className={`p-3 rounded-full bg-${item.bgColor.split('-')[2]}-50`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium arabic text-center">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
