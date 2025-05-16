
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState<"teacher" | "parent">("parent");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const { toast } = useToast();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  // للتحقق من الجلسة وإعادة توجيه المستخدم إلى الرئيسية إذا تم الدخول
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          // Check user role and redirect accordingly
          const { data: profileData } = await supabase
            .from("profiles")
            .select("app_role")
            .eq("id", data.session.user.id)
            .single();
            
          if (profileData) {
            if (profileData.app_role === "teacher") {
              navigate("/admin-dashboard");
            } else {
              navigate("/client-dashboard");
            }
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setCheckingSession(false);
      }
    };
    
    checkSession();
    
    // الاشتراك لتغير حالة الدخول
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        try {
          // Check user role and redirect accordingly
          const { data: profileData } = await supabase
            .from("profiles")
            .select("app_role")
            .eq("id", session.user.id)
            .single();
            
          if (profileData) {
            if (profileData.app_role === "teacher") {
              navigate("/admin-dashboard");
            } else {
              navigate("/client-dashboard");
            }
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          navigate("/");
        }
      }
    });
    
    return () => listener?.subscription.unsubscribe();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: inputs.email,
        password: inputs.password,
      });
      
      if (error) {
        throw error;
      } else {
        toast({ 
          title: "أهلا بك!", 
          description: "تم تسجيل الدخول بنجاح",
          variant: "default" 
        });
        
        // Redirecting will happen in the auth state change listener
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({ 
        title: "خطأ في تسجيل الدخول", 
        description: error.message || "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!inputs.name || !inputs.email || !inputs.password) {
        throw new Error("يرجى ملء جميع الحقول المطلوبة");
      }
      
      const { error } = await supabase.auth.signUp({
        email: inputs.email,
        password: inputs.password,
        options: {
          data: {
            name: inputs.name,
            app_role: role,
          }
        }
      });
      
      if (error) {
        throw error;
      } else {
        toast({ 
          title: "مرحبا!", 
          description: "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني للتأكيد.", 
          variant: "default" 
        });
        setTab("login");
        setInputs({ ...inputs, password: "" });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({ 
        title: "خطأ في إنشاء الحساب", 
        description: error.message || "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center arabic">
              {tab === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={tab} onValueChange={setTab} className="mb-6">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">دخول</TabsTrigger>
                <TabsTrigger value="signup">تسجيل</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 rtl arabic">
                  <Input
                    name="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={loading}>
                    {loading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> جار الدخول...</>
                    ) : "دخول"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 rtl arabic">
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant={role === "teacher" ? "default" : "outline"}
                      className={`flex-1 ${role === "teacher" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                      onClick={() => setRole("teacher")}
                      disabled={loading}
                    >
                      مدير / مدرس
                    </Button>
                    <Button 
                      type="button" 
                      variant={role === "parent" ? "default" : "outline"}
                      className={`flex-1 ${role === "parent" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                      onClick={() => setRole("parent")}
                      disabled={loading}
                    >
                      عميل / ولي أمر
                    </Button>
                  </div>
                  <Input
                    name="name"
                    placeholder="الاسم الكامل"
                    value={inputs.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={loading}>
                    {loading ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري تسجيل الحساب...</>
                    ) : "تسجيل"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AuthPage;
