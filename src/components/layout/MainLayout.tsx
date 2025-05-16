
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SidebarWrapper from "./SidebarWrapper";
import { Toaster } from "@/components/ui/toaster";
import HeaderWrapper from "./HeaderWrapper";
import { supabase } from "@/integrations/supabase/client";

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const MainLayout = ({ children, requireAuth = false }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

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
    setSidebarOpen(!isMobile);
    // Short delay to ensure smooth UI loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (requireAuth && checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 overflow-x-hidden transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <HeaderWrapper toggleSidebar={toggleSidebar} />
      <div className="flex">
        <SidebarWrapper isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`flex-1 transition-all duration-300 ease-in-out pt-16 ${sidebarOpen ? 'ml-[80px]' : 'ml-0'}`}>
          <div className="w-full min-h-screen bg-slate-50">
            <main className="p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default MainLayout;
