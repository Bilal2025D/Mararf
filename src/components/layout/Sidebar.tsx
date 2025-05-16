
import { Link } from "react-router-dom";
import { 
  Calendar,
  Users,
  MessageSquare,
  FileText, 
  Settings,
  Image,
  ChevronLeft,
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
      icon: <Calendar className="h-6 w-6" />,
      path: "/",
    },
    {
      icon: <Users className="h-6 w-6" />,
      path: "/members",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      path: "/attendance",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      path: "/student-evaluation",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      path: "/messages",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      path: "/reports",
    },
    {
      icon: <Image className="h-6 w-6" />,
      path: "/gallery",
    },
    {
      icon: <Settings className="h-6 w-6" />,
      path: "/settings",
    },
  ];

  return (
    <aside
      className={cn(
        "bg-emerald-700 text-white h-screen fixed left-0 top-0 bottom-0 z-30 transition-all duration-300 w-[80px] flex flex-col",
        isOpen && isMobile ? "left-0" : isMobile && !isOpen ? "-left-[80px]" : "left-0"
      )}
    >
      <div className="flex justify-center items-center p-4">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="absolute -right-10 top-5 bg-emerald-700 p-2 rounded-r-lg text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="flex flex-col space-y-4 mt-6 flex-1 items-center">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center justify-center w-full py-4 text-white hover:bg-emerald-600 transition-colors"
          >
            <div className="flex items-center justify-center">
              {item.icon}
            </div>
          </Link>
        ))}
      </div>

      <div className="p-4 flex justify-center">
        <div className="text-center text-xl font-bold">
          1.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
