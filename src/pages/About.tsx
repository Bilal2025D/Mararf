
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, BookOpen, Calendar, Users, MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold rtl arabic text-emerald-700">تعريف بالجمعية</h1>
          <div className="mt-4 md:mt-0 bg-emerald-50 px-4 py-2 rounded-lg text-emerald-700 rtl arabic">
            <span>مطالع العلوم والمعارف</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-xl rtl arabic text-emerald-800 flex items-center gap-2">
              <Info className="h-5 w-5" />
              نبذة عن الجمعية
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="rtl arabic space-y-4 text-gray-700">
              <p>
                تأسست جمعية مطالع العلوم والمعارف في عام 1435هـ، بهدف تعليم القرآن الكريم وعلومه، ونشر الوعي الديني بين أفراد المجتمع، وتخريج جيل متميز من حفظة كتاب الله تعالى.
              </p>
              <p>
                تعمل الجمعية تحت إشراف وزارة الشؤون الإسلامية والأوقاف والدعوة والإرشاد، وتقدم خدماتها التعليمية والدعوية للمجتمع من خلال حلقات تحفيظ القرآن الكريم وبرامج تعليمية متنوعة.
              </p>
              <p>
                تسعى الجمعية إلى تحقيق التميز في تعليم القرآن الكريم وعلومه، وتطبيق أحدث الأساليب التربوية والتعليمية، لضمان جودة التعليم وتيسير عملية الحفظ والفهم للطلاب على اختلاف فئاتهم العمرية.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-lg rtl arabic text-emerald-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                رؤيتنا ورسالتنا
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="rtl arabic space-y-4 text-gray-700">
                <div>
                  <h3 className="font-bold mb-2 text-emerald-700">رؤيتنا:</h3>
                  <p>الريادة في تعليم القرآن الكريم وعلومه وتخريج حفظة متقنين لكتاب الله تعالى.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-emerald-700">رسالتنا:</h3>
                  <p>تعليم القرآن الكريم وعلومه بإتقان، وتربية جيل محب لكتاب الله تعالى، وتأهيل معلمين متميزين في تدريس القرآن الكريم وعلومه.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-emerald-700">قيمنا:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>الإخلاص في العمل</li>
                    <li>الإتقان والجودة</li>
                    <li>الاحترام المتبادل</li>
                    <li>التعاون والعمل بروح الفريق</li>
                    <li>الشراكة المجتمعية</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-lg rtl arabic text-emerald-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                أنشطة الجمعية
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="rtl arabic space-y-4 text-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1 ml-3">
                      <BookOpen className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-700">حلقات تحفيظ القرآن الكريم</h4>
                      <p className="text-sm">للرجال والنساء والأطفال بمختلف الأعمار</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1 ml-3">
                      <BookOpen className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-700">دورات في علوم القرآن والتجويد</h4>
                      <p className="text-sm">تأهيل المعلمين والطلاب في أحكام التجويد والقراءات</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1 ml-3">
                      <Calendar className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-700">المسابقات القرآنية</h4>
                      <p className="text-sm">مسابقات سنوية للحفظ والتجويد بجوائز قيمة</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 p-2 rounded-full mt-1 ml-3">
                      <Users className="h-4 w-4 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-700">الدورات التدريبية</h4>
                      <p className="text-sm">تدريب المعلمين والمشرفين على أحدث طرق التدريس</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg rtl arabic text-emerald-800 flex items-center gap-2">
              <Users className="h-5 w-5" />
              إدارة الجمعية
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="rtl arabic grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4 bg-gray-50">
                <h3 className="font-bold mb-2 text-emerald-700">مجلس الإدارة</h3>
                <Separator className="my-2" />
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>الشيخ أحمد محمد العامري</span>
                    <span className="text-emerald-700">رئيس مجلس الإدارة</span>
                  </li>
                  <li className="flex justify-between">
                    <span>الدكتور عبد الله سعيد الغامدي</span>
                    <span className="text-emerald-700">نائب الرئيس</span>
                  </li>
                  <li className="flex justify-between">
                    <span>الأستاذ سعد خالد القرني</span>
                    <span className="text-emerald-700">أمين الصندوق</span>
                  </li>
                  <li className="flex justify-between">
                    <span>الدكتور محمد عبد الرحمن الشهري</span>
                    <span className="text-emerald-700">عضو</span>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-lg border p-4 bg-gray-50">
                <h3 className="font-bold mb-2 text-emerald-700">الإدارة التنفيذية</h3>
                <Separator className="my-2" />
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>الأستاذ فهد محمد الزهراني</span>
                    <span className="text-emerald-700">المدير التنفيذي</span>
                  </li>
                  <li className="flex justify-between">
                    <span>الأستاذ خالد علي الشهري</span>
                    <span className="text-emerald-700">مدير الشؤون التعليمية</span>
                  </li>
                  <li className="flex justify-between">
                    <span>الأستاذة نورة سعيد القحطاني</span>
                    <span className="text-emerald-700">مديرة القسم النسائي</span>
                  </li>
                  <li className="flex justify-between">
                    <span>الأستاذ سعيد عبد الله الغامدي</span>
                    <span className="text-emerald-700">المدير المالي</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 border-b">
            <CardTitle className="text-lg rtl arabic text-emerald-800 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              بيانات الاتصال
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="rtl arabic grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 ml-3 text-emerald-700" />
                  <div>
                    <h4 className="font-bold">العنوان:</h4>
                    <p>حي النزهة، شارع الأمير سلطان، مدينة الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 ml-3 text-emerald-700" />
                  <div>
                    <h4 className="font-bold">الهاتف:</h4>
                    <p>0114567890 - 0114567891</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 ml-3 text-emerald-700" />
                  <div>
                    <h4 className="font-bold">البريد الإلكتروني:</h4>
                    <p>info@mataliealkitab.org</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 ml-3 text-emerald-700" />
                  <div>
                    <h4 className="font-bold">الموقع الإلكتروني:</h4>
                    <p>www.mataliealkitab.org</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-emerald-700">أوقات العمل:</h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 ml-3 text-emerald-700" />
                    <div>
                      <div className="flex justify-between">
                        <span>من الأحد إلى الخميس:</span>
                        <span>8:00 صباحاً - 8:00 مساءً</span>
                      </div>
                      <div className="flex justify-between">
                        <span>الجمعة:</span>
                        <span>مغلق</span>
                      </div>
                      <div className="flex justify-between">
                        <span>السبت:</span>
                        <span>4:00 عصراً - 8:00 مساءً</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 rtl arabic">
                    <Mail className="ml-2 h-4 w-4" />
                    تواصل معنا
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default About;
