
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface MemberFormProps {
  onSubmit: (memberData: {
    name: string;
    role: string;
    phone: string;
    email: string;
    type: string;
    status: string;
  }) => void;
  onCancel: () => void;
  syncing: boolean;
}

const MemberForm: React.FC<MemberFormProps> = ({ onSubmit, onCancel, syncing }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    type: "student",
    status: "active"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Card className="mb-6 border-emerald-100 shadow-sm">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold mb-4 arabic text-emerald-700">إضافة عضو جديد</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rtl">
          <Input 
            placeholder="الاسم" 
            value={formData.name}
            name="name"
            onChange={handleChange}
            className="arabic"
          />
          <Input 
            placeholder="الدور (أستاذ/تلميذ)" 
            value={formData.role}
            name="role"
            onChange={handleChange}
            className="arabic"
          />
          <Input 
            placeholder="رقم الهاتف" 
            value={formData.phone}
            name="phone"
            onChange={handleChange}
            className="arabic"
          />
          <Input 
            placeholder="البريد الإلكتروني" 
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="arabic"
          />
          <select 
            value={formData.type}
            name="type"
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input rtl arabic"
          >
            <option value="teacher">أستاذ/ة</option>
            <option value="student">تلميذ/ة</option>
          </select>
          <select 
            value={formData.status}
            name="status"
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-input rtl arabic"
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="arabic"
          >
            إلغاء
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 arabic"
            disabled={syncing}
          >
            {syncing ? 'جاري الإضافة...' : 'إضافة العضو'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberForm;
