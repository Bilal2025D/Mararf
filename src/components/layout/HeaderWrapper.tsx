
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, Moon, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";

interface HeaderWrapperProps {
  toggleSidebar: () => void;
}

const HeaderWrapper = ({ toggleSidebar }: HeaderWrapperProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Check authentication status
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    toast({
      title: !isDark ? "تم تفعيل الوضع الداكن" : "تم تفعيل الوضع الفاتح",
      description: "يمكنك تغيير المظهر في أي وقت",
    });
  };
  
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل الخروج بنجاح",
      });
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الخروج",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="fixed top-0 right-0 left-0 z-20 bg-white shadow-sm border-b">
      <div className="flex justify-between items-center px-4 py-3 ml-[80px]">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleSidebar}
          className={isMobile ? "block" : "hidden"}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <div className="flex-1 flex justify-center">
          <div className="text-center rtl">
            {loading ? (
              <span className="px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">جار التحميل...</span>
            ) : user ? (
              <span className="px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">متصل</span>
            ) : (
              <span className="px-4 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">غير متصل</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
          >
            <Moon className="h-6 w-6" />
          </Button>
          
          {user ? (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="arabic hidden sm:inline">تسجيل خروج</span>
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 text-sm"
            >
              <LogIn className="h-4 w-4" />
              <span className="arabic hidden sm:inline">تسجيل دخول</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderWrapper;
