
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, CheckCircle, Users, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [messageText, setMessageText] = useState("");
  
  // Datos de muestra
  const contacts = [
    { id: "1", name: "عمر علي", phone: "0567891234", type: "student", parent: "محمد علي" },
    { id: "2", name: "سارة عبد الله", phone: "0512345678", type: "student", parent: "خالد عبد الله" },
    { id: "3", name: "خالد محمود", phone: "0523456789", type: "student", parent: "أحمد محمود" },
    { id: "4", name: "نورة سعد", phone: "0590123456", type: "student", parent: "سعد العمري" },
    { id: "5", name: "محمد عبد العزيز", phone: "0567123456", type: "student", parent: "عبد العزيز محمد" },
    { id: "6", name: "لمى صالح", phone: "0523987654", type: "student", parent: "صالح الأحمد" },
    { id: "7", name: "أحمد محمد", phone: "0534567890", type: "teacher" },
    { id: "8", name: "فاطمة أحمد", phone: "0556781234", type: "teacher" },
  ];
  
  // Historial de mensajes
  const messageHistory = [
    { 
      id: 1, 
      text: "تذكير: غدًا جلسة تحفيظ الجزء الثلاثين في تمام الساعة 4 عصرًا.", 
      date: "2025-04-15", 
      recipients: 6, 
      status: "delivered" 
    },
    { 
      id: 2, 
      text: "تذكير: موعد اجتماع أولياء الأمور يوم الثلاثاء القادم الموافق 22 أبريل في تمام الساعة 6 مساءً.", 
      date: "2025-04-18", 
      recipients: 12, 
      status: "delivered" 
    },
    { 
      id: 3, 
      text: "تنبيه: تم تأجيل درس اليوم بسبب ظروف طارئة. سيتم تعويضه يوم غد في نفس الموعد.", 
      date: "2025-04-20", 
      recipients: 8, 
      status: "sent" 
    },
  ];
  
  // Filtrar contactos
  const filteredContacts = contacts.filter(contact => 
    contact.name.includes(searchTerm) || 
    contact.phone.includes(searchTerm) ||
    (contact.parent && contact.parent.includes(searchTerm))
  );
  
  // Manejar selección de contactos
  const handleToggleContact = (contactId: string) => {
    setSelectedRecipients(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId);
      } else {
        return [...prev, contactId];
      }
    });
  };
  
  // Seleccionar/deseleccionar todos
  const handleToggleAll = () => {
    if (selectedRecipients.length === filteredContacts.length) {
      setSelectedRecipients([]);
    } else {
      setSelectedRecipients(filteredContacts.map(c => c.id));
    }
  };
  
  // Enviar mensaje
  const handleSendMessage = () => {
    // En una aplicación real, aquí se enviaría el SMS a los destinatarios seleccionados
    console.log("Enviando mensaje:", messageText);
    console.log("Destinatarios:", selectedRecipients);
    
    // Reiniciar el formulario después de enviar
    setMessageText("");
    setSelectedRecipients([]);
    
    // Mostrar notificación de éxito (en una app real)
    alert("تم إرسال الرسالة بنجاح!");
  };
  
  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA');
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-6 rtl arabic">الرسائل</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="rtl arabic">إرسال رسالة SMS جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 rtl arabic">
                      محتوى الرسالة
                    </label>
                    <Textarea 
                      placeholder="اكتب نص الرسالة هنا..." 
                      value={messageText}
                      onChange={e => setMessageText(e.target.value)}
                      className="resize-none rtl arabic"
                      rows={4}
                    />
                    <div className="text-right text-xs text-muted-foreground mt-1 rtl arabic">
                      {messageText.length} / 160 حرف
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1 rtl arabic">
                      المستلمون ({selectedRecipients.length})
                    </label>
                    
                    <div className="relative mb-2">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="البحث عن مستلم..." 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 rtl arabic"
                      />
                    </div>
                    
                    <div className="border rounded-md">
                      <div className="p-2 border-b bg-muted/50 flex items-center rtl">
                        <Checkbox 
                          checked={selectedRecipients.length === filteredContacts.length && filteredContacts.length > 0}
                          onCheckedChange={handleToggleAll}
                          className="mr-2"
                        />
                        <label className="text-sm font-medium arabic">
                          تحديد الكل
                        </label>
                      </div>
                      <div className="max-h-60 overflow-y-auto p-1">
                        {filteredContacts.length === 0 ? (
                          <div className="text-center py-4 text-muted-foreground">
                            لا توجد نتائج للبحث
                          </div>
                        ) : (
                          filteredContacts.map(contact => (
                            <div 
                              key={contact.id} 
                              className="flex items-center p-2 hover:bg-muted/50 rounded rtl"
                            >
                              <Checkbox 
                                checked={selectedRecipients.includes(contact.id)}
                                onCheckedChange={() => handleToggleContact(contact.id)}
                                className="mr-2"
                              />
                              <div className="flex-1 arabic">
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center justify-between">
                                  <span>
                                    {contact.phone} 
                                    {contact.type === 'student' && ' • ' + contact.parent}
                                  </span>
                                  <Badge className="text-[10px] py-0" variant="outline">
                                    {contact.type === 'teacher' ? 'أستاذ' : 'تلميذ'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      className="khair-btn-primary" 
                      onClick={handleSendMessage}
                      disabled={selectedRecipients.length === 0 || !messageText.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      <span className="arabic">إرسال الرسالة</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center rtl arabic">
                  <MessageSquare className="h-5 w-5 ml-2" />
                  سجل الرسائل المرسلة
                </CardTitle>
              </CardHeader>
              <CardContent>
                {messageHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground arabic">لم يتم إرسال أي رسائل بعد</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messageHistory.map(message => (
                      <div key={message.id} className="p-3 border rounded-md rtl">
                        <div className="flex justify-between items-start">
                          <div className="font-medium text-sm arabic">{formatDate(message.date)}</div>
                          <Badge variant={message.status === 'delivered' ? 'default' : 'outline'} className="text-[10px]">
                            {message.status === 'delivered' ? 'تم التوصيل' : 'تم الإرسال'}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm arabic">{message.text}</p>
                        <div className="mt-2 text-xs text-muted-foreground flex items-center arabic">
                          <Users className="h-3 w-3 ml-1" />
                          تم الإرسال إلى {message.recipients} مستلم
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
