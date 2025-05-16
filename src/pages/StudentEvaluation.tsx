
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, Search, User } from "lucide-react";

const StudentEvaluation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const students = [
    { id: 1, name: "عمر علي", evaluation: 4, notes: "ممتاز في الحفظ، يحتاج مراجعة" },
    { id: 2, name: "سارة عبد الله", evaluation: 5, notes: "متفوقة في الحفظ والتجويد" },
    { id: 3, name: "خالد محمود", evaluation: 3, notes: "مستوى متوسط، يحتاج المزيد من الاهتمام" },
    { id: 4, name: "نورة سعد", evaluation: 4, notes: "جيدة في الحفظ" },
    { id: 5, name: "محمد عبد العزيز", evaluation: 5, notes: "متميز في الحفظ" },
    { id: 6, name: "لمى صالح", evaluation: 3, notes: "تحتاج إلى متابعة في المراجعة" },
  ];
  
  const filteredStudents = students.filter(student => 
    student.name.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="animate-fade-in p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">تقييم حفظ الطلاب</h1>
          <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700">
            <span className="arabic">إضافة تقييم جديد</span>
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="البحث عن طالب..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rtl arabic"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map(student => (
            <Card key={student.id} className="overflow-hidden transition-all duration-200 shadow hover:shadow-md">
              <CardContent className="p-0">
                <div className="h-2 w-full bg-amber-400"></div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center mb-3">
                      <div className="rounded-full bg-emerald-50 flex items-center justify-center h-12 w-12">
                        <User className="h-6 w-6 text-emerald-700" />
                      </div>
                      <div className="mr-3 rtl">
                        <h3 className="font-bold arabic text-emerald-800">
                          {student.name}
                        </h3>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index}
                          className={`h-5 w-5 ${index < student.evaluation ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-3 rtl arabic text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {student.notes}
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button variant="outline" size="sm" className="text-xs arabic">
                      تعديل التقييم
                    </Button>
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

export default StudentEvaluation;
