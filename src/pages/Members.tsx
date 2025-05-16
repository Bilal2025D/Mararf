
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Search, Phone, Mail, User, Trash, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  // بيانات نموذجية (في تطبيق حقيقي، ستأتي من API أو قاعدة بيانات)
  const [members, setMembers] = useState([
    { 
      id: 1, 
      name: "أحمد محمد", 
      role: "أستاذ", 
      phone: "0534567890", 
      email: "ahmed@example.com",
      status: "active",
      type: "teacher"
    },
    { 
      id: 2, 
      name: "فاطمة أحمد", 
      role: "أستاذة", 
      phone: "0556781234", 
      email: "fatima@example.com",
      status: "active",
      type: "teacher"
    },
    { 
      id: 3, 
      name: "عمر علي", 
      role: "تلميذ", 
      phone: "0567891234", 
      email: "",
      status: "active",
      type: "student"
    },
    { 
      id: 4, 
      name: "سارة عبد الله", 
      role: "تلميذة", 
      phone: "0512345678", 
      email: "",
      status: "inactive",
      type: "student"
    },
    { 
      id: 5, 
      name: "خالد محمود", 
      role: "تلميذ", 
      phone: "0523456789", 
      email: "",
      status: "active",
      type: "student"
    },
    { 
      id: 6, 
      name: "نورة سعد", 
      role: "تلميذة", 
      phone: "0590123456", 
      email: "",
      status: "active",
      type: "student"
    },
  ]);

  // حذف عضو
  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف العضو بنجاح",
    });
  };

  // إضافة عضو جديد (وهمي للعرض)
  const handleAddMember = () => {
    const newMember = {
      id: Math.floor(Math.random() * 1000) + 10,
      name: "عضو جديد",
      role: Math.random() > 0.5 ? "أستاذ" : "تلميذ",
      phone: `05${Math.floor(Math.random() * 100000000)}`,
      email: "",
      status: "active",
      type: Math.random() > 0.5 ? "teacher" : "student"
    };
    
    setMembers([...members, newMember]);
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة عضو جديد بنجاح",
    });
  };

  // تعديل عضو (وهمي للعرض)
  const handleEditMember = (id: number) => {
    toast({
      title: "تعديل العضو",
      description: `تم بدء تعديل العضو رقم ${id}`,
    });
  };

  // فلترة الأعضاء حسب علامة التبويب النشطة وكلمة البحث
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.includes(searchTerm) || 
                         member.phone.includes(searchTerm) || 
                         member.email.includes(searchTerm);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "teachers") return matchesSearch && member.type === "teacher";
    if (activeTab === "students") return matchesSearch && member.type === "student";
    if (activeTab === "inactive") return matchesSearch && member.status === "inactive";
    
    return matchesSearch;
  });

  return (
    <MainLayout>
      <div className="animate-fade-in p-4 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">الأعضاء</h1>
          <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700" onClick={handleAddMember}>
            <UserPlus className="mr-2 h-4 w-4" />
            <span className="arabic">إضافة عضو</span>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="البحث عن الأعضاء..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl arabic"
            />
          </div>
        </div>

        <Tabs 
          defaultValue="all" 
          className="mb-6" 
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 mb-4 bg-emerald-50">
            <TabsTrigger value="all" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">الكل</TabsTrigger>
            <TabsTrigger value="teachers" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">الأساتذة</TabsTrigger>
            <TabsTrigger value="students" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">التلاميذ</TabsTrigger>
            <TabsTrigger value="inactive" className="arabic data-[state=active]:bg-emerald-600 data-[state=active]:text-white">غير نشط</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map(member => (
            <Card 
              key={member.id} 
              className={`overflow-hidden transition-all duration-200 shadow hover:shadow-md ${member.status === 'inactive' ? 'opacity-70' : ''}`}
            >
              <CardContent className="p-0">
                <div className={`h-2 w-full ${member.type === 'teacher' ? 'bg-amber-400' : 'bg-emerald-500'}`}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="rounded-full bg-emerald-50 flex items-center justify-center h-12 w-12">
                        <User className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div className="mr-3 rtl">
                        <h3 className="font-bold arabic text-emerald-800">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-500 arabic">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => handleEditMember(member.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm rtl">
                      <Phone className="h-4 w-4 ml-2 text-gray-500" />
                      <span className="arabic">{member.phone}</span>
                    </div>
                    {member.email && (
                      <div className="flex items-center text-sm rtl">
                        <Mail className="h-4 w-4 ml-2 text-gray-500" />
                        <span>{member.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Members;
