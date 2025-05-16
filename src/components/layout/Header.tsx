
import { MoonIcon, SunIcon, MenuIcon, BookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();

  // Monitor online status
  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);
  
  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const formattedTime = new Intl.DateTimeFormat('ar-SA', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(currentTime);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-2 md:px-4 h-16 bg-white border-b shadow-sm">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <MenuIcon className="h-5 w-5" />
        </Button>
        <h1 className={`text-xl font-bold ${isMobile ? 'text-sm' : ''} rtl`}>
          <BookIcon className="h-5 w-5 inline text-emerald-600 mr-2" />
          {!isMobile && (
            <span className="text-emerald-700 text-sm">لإدارة الجمعيات</span>
          )}
        </h1>
      </div>
      <div className="flex items-center gap-1 md:gap-4">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${isOnline ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isOnline ? 'متصل' : 'غير متصل'}
        </div>
        
        {!isMobile && (
          <div className="text-sm font-medium text-muted-foreground rtl arabic">
            {formattedTime}
          </div>
        )}
        
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
