
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Search, Send, User, Phone, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ParentChat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentChat, setCurrentChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");
  
  const contacts = [
    {
      id: 1, 
      name: "عبد الله محمد",
      studentName: "سلطان عبد الله",
      lastMessage: "شكراً لكم على التواصل الدائم",
      time: "10:30",
      online: true,
      unread: 0
    },
    {
      id: 2, 
      name: "فاطمة أحمد",
      studentName: "سارة فاطمة",
      lastMessage: "هل يمكن تحديد موعد لمقابلة المعلم؟",
      time: "أمس",
      online: false,
      unread: 2
    },
    {
      id: 3, 
      name: "خالد العمري",
      studentName: "عمر خالد",
      lastMessage: "متى موعد الاختبار القادم؟",
      time: "الأحد",
      online: false,
      unread: 0
    },
    {
      id: 4, 
      name: "نورة القحطاني",
      studentName: "لمى نورة",
      lastMessage: "هل هناك واجبات للأسبوع القادم؟",
      time: "الخميس",
      online: true,
      unread: 1
    },
  ];
  
  const messages = [
    {
      id: 1,
      chatId: 1,
      text: "السلام عليكم، كيف حال سلطان في الحفظ؟",
      sender: "teacher",
      time: "10:25"
    },
    {
      id: 2,
      chatId: 1,
      text: "وعليكم السلام، الحمد لله هو متحمس للحفظ ويراجع كل يوم",
      sender: "parent",
      time: "10:28"
    },
    {
      id: 3,
      chatId: 1,
      text: "هذا رائع، نلاحظ تقدمه المستمر. هل لديكم أي استفسارات حول المنهج؟",
      sender: "teacher",
      time: "10:29"
    },
    {
      id: 4,
      chatId: 1,
      text: "شكراً لكم على التواصل الدائم، فقط أود معرفة موعد الاختبار القادم",
      sender: "parent",
      time: "10:30"
    },
  ];
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.includes(searchTerm) ||
    contact.studentName.includes(searchTerm)
  );
  
  const currentChatMessages = messages.filter(message => 
    message.chatId === currentChat
  );
  
  const currentContact = contacts.find(contact => 
    contact.id === currentChat
  );
  
  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("إرسال رسالة:", messageText);
      setMessageText("");
      // في التطبيق الحقيقي، سنضيف الرسالة إلى القائمة
    }
  };

  return (
    <MainLayout>
      <div className="animate-fade-in p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">محادثات أولياء الأمور</h1>
          <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700">
            <MessageCircle className="mr-2 h-4 w-4" />
            <span className="arabic">محادثة جديدة</span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row h-[75vh] gap-4">
          <Card className="w-full md:w-1/3 overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="البحث عن محادثة..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rtl arabic"
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[calc(75vh-70px)]">
                <div className="divide-y">
                  {filteredContacts.map(contact => (
                    <button
                      key={contact.id}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        currentChat === contact.id ? 'bg-emerald-50' : ''
                      }`}
                      onClick={() => setCurrentChat(contact.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                                {contact.name.substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                          </div>
                          <div className="mr-3 rtl">
                            <h3 className="font-medium arabic text-emerald-800">
                              {contact.name}
                            </h3>
                            <p className="text-xs text-gray-500 arabic">
                              {contact.studentName}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500 arabic">{contact.time}</span>
                          {contact.unread > 0 && (
                            <span className="mt-1 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate rtl arabic">
                        {contact.lastMessage}
                      </p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-0 h-full flex flex-col">
              {currentChat ? (
                <>
                  <div className="p-4 border-b bg-emerald-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-emerald-200 text-emerald-700">
                            {currentContact?.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="mr-3 rtl">
                          <h3 className="font-medium arabic text-emerald-800">
                            {currentContact?.name}
                          </h3>
                          <p className="text-xs text-emerald-600 arabic">
                            {currentContact?.studentName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <User className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-grow p-4">
                    <div className="space-y-4">
                      {currentChatMessages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'teacher' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div 
                            className={`
                              max-w-[70%] rounded-lg p-3 
                              ${message.sender === 'teacher' 
                                ? 'bg-gray-100 text-gray-900' 
                                : 'bg-emerald-500 text-white'
                              }
                            `}
                          >
                            <p className="text-sm rtl arabic">{message.text}</p>
                            <div 
                              className={`
                                text-xs mt-1 flex items-center
                                ${message.sender === 'teacher' ? 'text-gray-500' : 'text-emerald-100'}
                              `}
                            >
                              <Clock className="h-3 w-3 ml-1" />
                              {message.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="border-t p-3">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="اكتب رسالتك هنا..." 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="rtl arabic"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && messageText.trim()) {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button 
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 mx-auto text-gray-300" />
                    <p className="mt-2 text-gray-500 arabic">اختر محادثة للبدء</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ParentChat;
