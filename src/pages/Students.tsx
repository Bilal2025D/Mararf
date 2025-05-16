
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Users } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

// نوع الطالب
type Student = {
  id: string;
  full_name: string;
  parent_id: string | null;
};

// نوع المستخدم (ولي/ولية أمر)
type ParentProfile = {
  id: string;
  name: string;
  email: string | null;
  app_role?: string;
};

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<ParentProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    parent_id: "",
  });

  // جلب الأولياء من قاعدة البيانات (الدور: parent)
  useEffect(() => {
    const fetchParents = async () => {
      try {
        console.log("جلب بيانات أولياء الأمور...");
        // الحصول على المستخدمين الذين لهم الدور parent
        const { data, error } = await supabase
          .from('profiles')
          .select('id, name, email, app_role')
          .eq('app_role', 'parent');
          
        if (error) {
          console.error("خطأ في جلب بيانات أولياء الأمور:", error);
          throw error;
        }
        if (data) {
          console.log("تم جلب بيانات أولياء الأمور:", data);
          setParents(data as ParentProfile[]);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات أولياء الأمور:", error);
      }
    };
    fetchParents();
  }, []);

  // جلب الطلاب من قاعدة البيانات
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("جلب بيانات الطلاب...");
        const { data, error } = await supabase
          .from('students')
          .select('id, full_name, parent_id')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("خطأ في جلب بيانات الطلاب:", error);
          throw error;
        }
        if (data) {
          console.log("تم جلب بيانات الطلاب:", data);
          setStudents(data as Student[]);
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات الطلاب:", error);
      }
    };
    fetchStudents();
  }, []);

  // إضافة طالب جديد
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.parent_id) {
      toast({ title: "تأكد", description: "يرجى ملء جميع الحقول", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      console.log("إضافة طالب جديد:", form);
      const { error } = await supabase
        .from('students')
        .insert({
          full_name: form.full_name,
          parent_id: form.parent_id,
        });
      
      if (error) {
        console.error("خطأ في إضافة الطالب:", error);
        throw error;
      }
      
      toast({ title: "تم", description: "تم إضافة الطالب بنجاح" });
      setForm({ full_name: "", parent_id: "" });
      
      // تحديث قائمة الطلاب
      const { data, error: fetchError } = await supabase
        .from('students')
        .select('id, full_name, parent_id')
        .order('created_at', { ascending: false });
        
      if (fetchError) {
        console.error("خطأ في تحديث قائمة الطلاب:", fetchError);
        throw fetchError;
      }
      if (data) {
        console.log("تم تحديث قائمة الطلاب:", data);
        setStudents(data as Student[]);
      }
    } catch (error: any) {
      console.error("خطأ في إضافة الطالب:", error);
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 rtl arabic flex items-center gap-2 text-khair-700">
          <Users className="h-8 w-8 text-khair" />
          إدارة الطلاب
        </h1>
        <p className="text-lg text-muted-foreground arabic mb-6">
          قم بإضافة الطلاب واربطهم بولي/ولية أمر.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 khair-card">
          <CardHeader className="bg-gradient-to-r from-khair-50 to-transparent border-b border-khair-100">
            <CardTitle className="arabic flex items-center gap-2 text-khair-700">
              <UserPlus className="h-5 w-5 text-khair" />
              إضافة طالب جديد
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <form onSubmit={handleAddStudent} className="space-y-4 rtl arabic">
              <Input
                placeholder="الاسم الكامل للطالب"
                value={form.full_name}
                onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                required
                className="bg-white border-khair-200 focus:border-khair focus:ring-khair/30"
              />
              <select
                value={form.parent_id}
                onChange={e => setForm(f => ({ ...f, parent_id: e.target.value }))}
                className="w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-khair/50 bg-white border-khair-200"
                required
              >
                <option value="" disabled>اختر ولي/ولية أمر</option>
                {parents.length > 0 ? parents.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.email})</option>
                )) : <option disabled>لا يوجد أولياء</option>}
              </select>
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full khair-btn-primary"
              >
                {loading ? "جاري الإضافة..." : "إضافة الطالب"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 khair-card">
          <CardHeader className="bg-gradient-to-r from-khair-50 to-transparent border-b border-khair-100">
            <CardTitle className="arabic text-khair-700">قائمة الطلاب</CardTitle>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <div className="text-center text-muted-foreground arabic py-8">
                لا يوجد طلاب حاليا.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full arabic text-right">
                  <thead>
                    <tr className="bg-khair-50/50">
                      <th className="p-3 font-medium text-khair-700">الاسم الكامل</th>
                      <th className="p-3 font-medium text-khair-700">ولي/ولية الأمر</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => {
                      const parent = parents.find(p => p.id === s.parent_id);
                      return (
                        <tr key={s.id} className="border-b border-khair-100 hover:bg-khair-50/20 transition-colors">
                          <td className="p-3">{s.full_name}</td>
                          <td className="p-3">
                            {parent ? `${parent.name} (${parent.email})` : "—"}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentsPage;
