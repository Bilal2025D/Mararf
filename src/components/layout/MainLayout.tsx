
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SidebarWrapper from "./SidebarWrapper";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import HeaderWrapper from "./HeaderWrapper";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/contexts/ThemeContext";

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const MainLayout = ({ children, requireAuth = false }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const { isDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isMounting, setIsMounting] = useState(true);

  // Check authentication if required
  useEffect(() => {
    const checkAuth = async () => {
      if (requireAuth) {
        try {
          const { data } = await supabase.auth.getSession();
          setIsAuthenticated(!!data.session);
          
          if (!data.session) {
            // Redirect to auth page if not authenticated
            window.location.href = "/auth";
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
        }
      }
      setCheckingAuth(false);
    };
    
    checkAuth();
  }, [requireAuth]);

  // Handle responsive sidebar
  useEffect(() => {
    // Always close sidebar on mobile by default
    setSidebarOpen(isMobile ? false : true);
    
    // Short delay to ensure smooth UI loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setIsMounting(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const handleOutsideClick = (e: MouseEvent) => {
      // Check if the sidebar is open and if the click is outside the sidebar
      const sidebar = document.querySelector('[data-sidebar="true"]');
      if (sidebarOpen && sidebar && !sidebar.contains(e.target as Node)) {
        setSidebarOpen(false);
      }
    };
    
    if (sidebarOpen && isMobile) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [sidebarOpen, isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (requireAuth && checkingAuth) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${
        isDarkMode ? 'bg-neutral-900 text-white' : 'bg-slate-50'
      }`}>
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen overflow-x-hidden transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${isDarkMode ? 'bg-neutral-900 text-white' : 'bg-slate-50'}`}
    >
      <HeaderWrapper toggleSidebar={toggleSidebar} />
      <div className="flex relative">
        <SidebarWrapper isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <div className={`flex-1 transition-all duration-300 ease-in-out pt-16 ${
          sidebarOpen && !isMobile ? 'ml-[80px]' : 'ml-0'
        }`}>
          <div className={`w-full min-h-screen ${isDarkMode ? 'bg-neutral-900' : 'bg-slate-50'}`}>
            <main className={`p-3 md:p-6 ${isMounting ? 'animate-fade-in' : ''}`}>
              {children}
            </main>
          </div>
        </div>
        
        {/* Mobile overlay when sidebar is open */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
      <Toaster />
      <Sonner position="bottom-center" className="z-50" />
    </div>
  );
};

export default MainLayout;
