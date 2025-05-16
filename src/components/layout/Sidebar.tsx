
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Calendar,
  Users,
  MessageSquare,
  FileText, 
  Settings,
  Image,
  ChevronLeft,
  Home,
  BookOpen,
  BarChart4,
  Bell,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/contexts/ThemeContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { isDarkMode } = useTheme();

  // Fetch user role from Supabase
  useEffect(() => {
    const getUserRole = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (session.session) {
          setIsAuthenticated(true);
          
          const { data } = await supabase
            .from("profiles")
            .select("app_role")
            .eq("id", session.session.user.id)
            .single();
          
          setUserRole(data?.app_role || null);
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };
    
    getUserRole();
    
    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        getUserRole();
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Admin menu items
  const adminMenuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      path: "/admin-dashboard",
      label: "لوحة التحكم"
    },
    {
      icon: <Users className="h-5 w-5" />,
      path: "/members",
      label: "الأعضاء"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      path: "/attendance",
      label: "الحضور"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      path: "/student-evaluation",
      label: "تقييم الطلاب"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/messages",
      label: "الرسائل"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      path: "/reports",
      label: "التقارير"
    },
    {
      icon: <Image className="h-5 w-5" />,
      path: "/gallery",
      label: "المعرض"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
      label: "الإعدادات"
    },
  ];

  // Client menu items
  const clientMenuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      path: "/client-dashboard",
      label: "الرئيسية"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      path: "/classes",
      label: "الحلقات"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      path: "/student-evaluation",
      label: "التقييمات"
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/parent-chat",
      label: "المحادثة"
    },
    {
      icon: <Bell className="h-5 w-5" />,
      path: "/announcements",
      label: "الإعلانات"
    },
    {
      icon: <BarChart4 className="h-5 w-5" />,
      path: "/exams-reports",
      label: "التقارير"
    }
  ];

  // Choose menu items based on user role
  const menuItems = userRole === "teacher" ? adminMenuItems : clientMenuItems;
  
  // Default menu for non-authenticated users
  const defaultMenuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      path: "/",
      label: "الرئيسية"
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      path: "/about",
      label: "عن النظام"
    }
  ];

  const displayMenuItems = isAuthenticated ? menuItems : defaultMenuItems;

  return (
    <aside
      data-sidebar="true"
      className={cn(
        "bg-emerald-700 text-white fixed top-0 bottom-0 z-30 transition-all duration-300 w-[80px] flex flex-col",
        isOpen && isMobile ? "left-0" : isMobile && !isOpen ? "-left-[80px]" : "left-0",
        isMobile ? "h-full pt-4" : "h-screen pt-16"
      )}
    >
      {isMobile && (
        <div className="flex justify-end px-2 mb-4">
          <button
            onClick={toggleSidebar}
            className="text-white p-2 rounded-full hover:bg-emerald-600"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="flex flex-col space-y-3 mt-2 flex-1 items-center overflow-y-auto no-scrollbar">
        {displayMenuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={cn(
              "flex items-center justify-center w-full py-3 text-white hover:bg-emerald-600 transition-colors relative group",
              location.pathname === item.path && "bg-emerald-600"
            )}
            title={item.label}
            onClick={isMobile ? toggleSidebar : undefined} // Close sidebar on navigation in mobile
          >
            <div className="flex items-center justify-center">
              {item.icon}
              <span className={cn(
                "fixed left-[80px] ml-2 px-2 py-1 rounded text-sm whitespace-nowrap",
                isDarkMode 
                  ? "bg-neutral-800 text-white" 
                  : "bg-white text-emerald-800 shadow-md",
                "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
              )}>
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="p-3 flex justify-center border-t border-emerald-600">
        <div className="text-center text-sm font-medium opacity-75">
          v1.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
