
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const isMobile = useIsMobile();
  
  const handleToggle = () => {
    toggleDarkMode();
  };
  
  const button = (
    <Button 
      variant="ghost" 
      size={isMobile ? "sm" : "icon"}
      onClick={handleToggle}
      className="transition-all duration-200 rounded-full"
    >
      {isDarkMode ? (
        <Sun className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-yellow-400`} />
      ) : (
        <Moon className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
      )}
      <span className="sr-only">
        {isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      </span>
    </Button>
  );
  
  // Don't use tooltip on mobile to avoid interference with touch events
  if (isMobile) {
    return button;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p dir="rtl">{isDarkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
