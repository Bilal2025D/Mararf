
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OnlineStatusIndicator } from "./OnlineStatusIndicator";
import { AuthStatus } from "./AuthStatus";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

interface HeaderWrapperProps {
  toggleSidebar: () => void;
}

const HeaderWrapper = ({ toggleSidebar }: HeaderWrapperProps) => {
  const isMobile = useIsMobile();
  const { isDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Add scroll detection for better mobile experience
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={`fixed top-0 right-0 left-0 z-20 shadow-sm border-b transition-all duration-200 ${
      isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-gray-200'
    } ${isScrolled ? 'shadow-md' : ''}`}>
      <div className={`flex justify-between items-center px-3 py-3 ${isMobile ? 'ml-0' : 'ml-[80px]'}`}>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
          className="block lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 flex justify-center">
          <div className="text-center rtl flex items-center gap-2">
            <AuthStatus />
            <OnlineStatusIndicator />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default HeaderWrapper;
