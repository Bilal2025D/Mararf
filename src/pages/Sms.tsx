
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Send, Users, Search, Check, Clock, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const Sms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  
  const messages = [
    {
      id: 1, 
      content: "نذكركم بموعد الاجتماع غداً الساعة السابعة مساءً",
      date: "2025-05-01",
      recipients: 24,
      status: "delivered"
    },
    {
      id: 2, 
      content: "نود إعلامكم بتأجيل حصة التجويد ليوم الخميس القادم",
      date: "2025-04-28",
      recipients: 18,
      status: "delivered"
    },
    {
      id: 3, 
      content: "تذكير: غداً آخر موعد لتسليم الواجبات",
      date: "2025-04-25",
      recipients: 15,
      status: "failed"
    },
    {
      id: 4, 
      content: "دعوة لحضور حفل تكريم الطلاب المتفوقين يوم السبت القادم",
      date: "2025-04-20",
      recipients: 35,
      status: "pending"
    }
  ];
  
  const groups = [
    { id: "teachers", name: "المعلمين", count: 8 },
    { id: "students", name: "الطلاب", count: 45 },
    { id: "parents", name: "أولياء الأمور", count: 38 },
    { id: "volunteers", name: "المتطوعين", count: 12 }
  ];
  
  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSendMessage = () => {
    console.log("رسالة جديدة:", { messageText, selectedGroups });
    setMessageText("");
    setSelectedGroups([]);
    // يمكن هنا إضافة رسالة نجاح
  };
  
  const filteredMessages = messages.filter(message => 
    message.content.includes(searchTerm)
  );

  return (
    <MainLayout>
      <div className="animate-fade-in p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">رسائل SMS</h1>
          <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-lg text-emerald-700">
            <Smartphone className="h-5 w-5 mr-2" />
            <span className="arabic text-sm">الرصيد المتبقي: 200 رسالة</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg rtl arabic text-emerald-800">إرسال رسالة جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium rtl arabic block mb-2">نص الرسالة</label>
                    <Textarea 
                      placeholder="اكتب نص الرسالة هنا..." 
                      className="rtl arabic"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    />
                    <div className="text-xs text-right mt-1 text-gray-500 arabic">
                      {messageText.length} / 160 حرف
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium rtl arabic block mb-2">اختر المجموعات</label>
                    <div className="grid grid-cols-2 gap-2">
                      {groups.map(group => (
                        <div 
                          key={group.id}
                          className={`flex items-center space-x-2 rounded-md border p-3 rtl
                            ${selectedGroups.includes(group.id) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'}`}
                        >
                          <Checkbox 
                            id={`group-${group.id}`} 
                            checked={selectedGroups.includes(group.id)}
                            onCheckedChange={() => handleGroupToggle(group.id)}
                          />
                          <label 
                            htmlFor={`group-${group.id}`}
                            className="flex-1 cursor-pointer flex items-center justify-between"
                          >
                            <span className="arabic mr-2">{group.name}</span>
                            <span className="text-xs text-gray-500">({group.count})</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700" 
                      disabled={!messageText || selectedGroups.length === 0}
                      onClick={handleSendMessage}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      <span className="arabic">إرسال الرسالة</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg rtl arabic text-emerald-800">الرسائل السابقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="البحث في الرسائل..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rtl arabic"
                  />
                </div>
                
                <div className="space-y-3">
                  {filteredMessages.map(message => (
                    <div key={message.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <p className="rtl arabic text-sm text-gray-900">{message.content}</p>
                        <div className={`rounded-full p-1 ${
                          message.status === 'delivered' ? 'bg-green-100 text-green-600' :
                          message.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {message.status === 'delivered' && <Check className="h-4 w-4" />}
                          {message.status === 'pending' && <Clock className="h-4 w-4" />}
                          {message.status === 'failed' && <X className="h-4 w-4" />}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="arabic">تم إرسالها إلى {message.recipients} مستلم</span>
                        <span className="rtl arabic">{new Date(message.date).toLocaleDateString('ar-SA')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg rtl arabic text-emerald-800">المجموعات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groups.map(group => (
                    <div key={group.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors flex justify-between items-center">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-emerald-600 mr-2" />
                        <span className="arabic">{group.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{group.count}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full arabic">
                    <Users className="mr-2 h-4 w-4" />
                    إدارة المجموعات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Sms;
