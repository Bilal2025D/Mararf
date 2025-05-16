
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [role, setRole] = useState<"teacher" | "parent">("teacher");
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  // للتحقق من الجلسة وإعادة توجيه المستخدم إلى الرئيسية إذا تم الدخول
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    checkSession();
    // الاشتراك لتغير حالة الدخول
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
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
    const { error } = await supabase.auth.signInWithPassword({
      email: inputs.email,
      password: inputs.password,
    });
    setLoading(false);
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "أهلا بك!", description: "تم تسجيل الدخول بنجاح" });
      navigate("/");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: inputs.email,
      password: inputs.password,
      options: {
        data: {
          name: inputs.name,
          app_role: role, // قد تختلف الحقل على حسب إعدادك لاحقًا
        }
      }
    });
    setLoading(false);
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "مرحبا!", description: "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني." });
    }
  };

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
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                  />
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? "جار الدخول..." : "دخول"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 rtl arabic">
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant={role === "teacher" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setRole("teacher")}
                    >
                      أستاذ / أستاذة
                    </Button>
                    <Button 
                      type="button" 
                      variant={role === "parent" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setRole("parent")}
                    >
                      ولي / ولية
                    </Button>
                  </div>
                  <Input
                    name="name"
                    placeholder="الاسم الكامل"
                    value={inputs.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    value={inputs.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    value={inputs.password}
                    onChange={handleChange}
                    required
                  />
                  <Button className="w-full" type="submit" disabled={loading}>
                    {loading ? "جاري تسجيل الحساب..." : "تسجيل"}
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
