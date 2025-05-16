
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';
import { Member } from '@/types';

// Import our components
import MemberForm from '@/components/members/MemberForm';
import MemberList from '@/components/members/MemberList';

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // Fetch members from Supabase when component mounts
  useEffect(() => {
    fetchMembers();
  }, []);
  
  // Fetch members from Supabase
  const fetchMembers = async () => {
    try {
      setLoading(true);
      console.log("Fetching members from Supabase...");
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) {
        console.error("Error fetching members:", error);
        toast({
          title: "خطأ في جلب البيانات",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log("Fetched profiles:", data);
        if (data) {
          // Transform profiles data to match our Member type
          const mappedMembers: Member[] = data.map(profile => ({
            id: profile.id,
            name: profile.name,
            email: profile.email,
            app_role: profile.app_role || '',
            phone: '',  // These might be stored in app_metadata in a real app
            status: 'active',
            type: profile.app_role === 'teacher' ? 'teacher' : 'student'
          }));
          setMembers(mappedMembers);
        } else {
          setMembers([]);
        }
      }
    } catch (err) {
      console.error("Error in fetchMembers:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Add a new member
  const handleAddMember = async (memberData: {
    name: string;
    role: string;
    phone: string;
    email: string;
    type: string;
    status: string;
  }) => {
    if (!memberData.name) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى إدخال اسم على الأقل",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSyncing(true);
      
      // Create new profile record
      const newId = uuidv4();
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          id: newId,
          name: memberData.name,
          email: memberData.email || null,
          app_role: memberData.role || (memberData.type === 'teacher' ? 'teacher' : 'student')
        }])
        .select();
        
      if (error) {
        console.error("Error adding member:", error);
        toast({
          title: "خطأ في إضافة العضو",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تم إضافة عضو جديد بنجاح"
        });
        
        setShowAddForm(false);
        
        // Update local state with the new member
        if (data && data.length > 0) {
          const newMemberData: Member = {
            id: data[0].id,
            name: data[0].name,
            email: data[0].email,
            app_role: data[0].app_role || '',
            phone: memberData.phone,
            status: memberData.status,
            type: memberData.type
          };
          setMembers([...members, newMemberData]);
        } else {
          // Refetch all members if we don't have the new data
          await fetchMembers();
        }
      }
    } catch (err) {
      console.error("Error in handleAddMember:", err);
    } finally {
      setSyncing(false);
    }
  };
  
  // Delete a member
  const handleDeleteMember = async (id: string) => {
    try {
      setSyncing(true);
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error("Error deleting member:", error);
        toast({
          title: "خطأ في حذف العضو",
          description: error.message,
          variant: "destructive"
        });
      } else {
        setMembers(members.filter(member => member.id !== id));
        toast({
          title: "تم الحذف بنجاح",
          description: "تم حذف العضو بنجاح"
        });
      }
    } catch (err) {
      console.error("Error in handleDeleteMember:", err);
    } finally {
      setSyncing(false);
    }
  };
  
  // Start editing a member
  const handleEditMember = (member: Member) => {
    setEditingMember(member);
  };
  
  // Update editing member state
  const handleEditingMemberChange = (updatedMember: Member) => {
    setEditingMember(updatedMember);
  };
  
  // Save edited member
  const handleSaveEdit = async () => {
    if (!editingMember) return;
    
    try {
      setSyncing(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editingMember.name,
          email: editingMember.email,
          app_role: editingMember.app_role
        })
        .eq('id', editingMember.id);
        
      if (error) {
        console.error("Error updating member:", error);
        toast({
          title: "خطأ في تحديث بيانات العضو",
          description: error.message,
          variant: "destructive"
        });
      } else {
        // Update local state
        setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
        setEditingMember(null);
        
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث بيانات العضو بنجاح"
        });
      }
    } catch (err) {
      console.error("Error in handleSaveEdit:", err);
    } finally {
      setSyncing(false);
    }
  };

  // Sync with Supabase
  const syncWithSupabase = async () => {
    setSyncing(true);
    toast({
      title: "جاري المزامنة...",
      description: "يتم مزامنة البيانات مع قاعدة البيانات"
    });
    
    await fetchMembers();
    
    setSyncing(false);
    toast({
      title: "تمت المزامنة بنجاح",
      description: "تم تحديث البيانات من قاعدة البيانات"
    });
  };

  return (
    <MainLayout>
      <div className="animate-fade-in p-4 bg-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">الأعضاء</h1>
          <div className="flex mt-4 md:mt-0 gap-2">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700" 
              onClick={() => setShowAddForm(!showAddForm)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              <span className="arabic">إضافة عضو</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              onClick={syncWithSupabase}
              disabled={syncing}
            >
              <Database className="mr-2 h-4 w-4" />
              <span className="arabic">{syncing ? 'جاري المزامنة...' : 'مزامنة'}</span>
            </Button>
          </div>
        </div>

        {showAddForm && (
          <MemberForm 
            onSubmit={handleAddMember} 
            onCancel={() => setShowAddForm(false)} 
            syncing={syncing} 
          />
        )}

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

        <MemberList
          members={members}
          editingMember={editingMember}
          loading={loading}
          syncing={syncing}
          searchTerm={searchTerm}
          activeTab={activeTab}
          onEdit={handleEditMember}
          onSave={handleSaveEdit}
          onDelete={handleDeleteMember}
          onEditChange={handleEditingMemberChange}
        />
      </div>
    </MainLayout>
  );
};

export default Members;
