
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  ChevronLeft,
  Users,
  UserPlus, 
  Calendar,
  CalendarCheck, 
  MessageSquare,
  FileText, 
  Settings,
  BookOpen,
  Star,
  Megaphone,
  Smartphone,
  Book,
  BookOpenCheck,
  MessageCircle,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const isMobile = useIsMobile();
  
  const menuItems = [
    {
      title: "لوحة التحكم",
      icon: <Calendar className="h-5 w-5" />,
      path: "/",
    },
    {
      title: "الأعضاء",
      icon: <Users className="h-5 w-5" />,
      path: "/members",
    },
    {
      title: "سجل الحضور والغياب",
      icon: <CalendarCheck className="h-5 w-5" />,
      path: "/attendance",
    },
    {
      title: "تقييم حفظ الطلاب",
      icon: <Star className="h-5 w-5" />,
      path: "/student-evaluation",
    },
    {
      title: "الإعلانات",
      icon: <Megaphone className="h-5 w-5" />,
      path: "/announcements",
    },
    {
      title: "رسائل SMS",
      icon: <Smartphone className="h-5 w-5" />,
      path: "/sms",
    },
    {
      title: "إدارة الحلقات",
      icon: <Book className="h-5 w-5" />,
      path: "/classes",
    },
    {
      title: "الامتحانات والتقارير",
      icon: <FileText className="h-5 w-5" />,
      path: "/exams-reports",
    },
    {
      title: "دردشة أولياء الأمور",
      icon: <MessageCircle className="h-5 w-5" />,
      path: "/parent-chat",
    },
    {
      title: "تعريف بالجمعية",
      icon: <Info className="h-5 w-5" />,
      path: "/about",
    },
    {
      title: "الطلاب",
      icon: <UserPlus className="h-5 w-5" />,
      path: "/students",
    },
    {
      title: "الإعدادات",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  return (
    <aside
      className={cn(
        "bg-emerald-50 text-emerald-900 h-screen overflow-y-auto fixed left-0 top-0 bottom-0 z-30 transition-all duration-300 shadow-lg flex flex-col rtl",
        isOpen ? (isMobile ? "w-56" : "w-64") : "w-16"
      )}
    >
      <div className="flex justify-between items-center p-4">
        {isOpen && (
          <div className="flex items-center space-x-2 font-bold text-xl">
            <BookOpen className="h-6 w-6 text-emerald-600" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="p-1 hover:bg-emerald-100 rounded-full"
        >
          {isOpen ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="flex flex-col space-y-1 mt-6 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center px-4 py-3 text-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <span className="mr-3">{item.icon}</span>
            {isOpen && <span className="arabic text-sm md:text-base">{item.title}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-emerald-200 mt-auto">
        {isOpen ? (
          <div className="text-center text-xs md:text-sm text-opacity-80 arabic">
            <div>مطالع العلوم والمعارف</div>
            <div>نسخة 1.0</div>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-xl">1.0</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
