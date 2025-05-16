
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import SidebarWrapper from "./SidebarWrapper";
import { Toaster } from "@/components/ui/toaster";
import HeaderWrapper from "./HeaderWrapper";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isLoaded, setIsLoaded] = useState(false);

  // تحسين الاستجابة عند تحميل الصفحة
  useEffect(() => {
    setSidebarOpen(!isMobile);
    // تأخير قصير لضمان تحميل واجهة المستخدم بشكل سلس
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen bg-gray-50 overflow-x-hidden transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <HeaderWrapper toggleSidebar={toggleSidebar} />
      <div className="flex">
        <SidebarWrapper isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`w-full transition-all duration-300 ease-in-out pt-16 ${sidebarOpen ? 'mr-0 md:mr-64' : 'mr-0 md:mr-16'}`}>
          <div className="mx-auto max-w-5xl min-h-screen bg-white shadow-sm relative">
            <main className="p-4">
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
