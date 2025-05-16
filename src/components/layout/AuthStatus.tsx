
import { useState, useEffect } from "react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export const AuthStatus = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  if (loading) {
    return <span className="px-4 py-1 bg-gray-100 text-gray-500 rounded-full text-sm font-medium">جار التحميل...</span>;
  }

  if (user) {
    return (
      <>
        <span className="px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">متصل</span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm"
        >
          <LogOut className="h-4 w-4" />
          <span className="arabic hidden sm:inline">تسجيل خروج</span>
        </Button>
      </>
    );
  }

  return (
    <>
      <span className="px-4 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">غير متصل</span>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => navigate("/auth")}
        className="flex items-center gap-2 text-sm"
      >
        <LogIn className="h-4 w-4" />
        <span className="arabic hidden sm:inline">تسجيل دخول</span>
      </Button>
    </>
  );
};
