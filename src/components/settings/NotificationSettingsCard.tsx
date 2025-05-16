
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const NotificationSettingsCard = () => (
  <Card className="bg-navy-800 border-navy-700">
    <CardHeader>
      <CardTitle className="rtl arabic text-gold">الإشعارات</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between rtl">
        <Label htmlFor="attendance-notifications" className="arabic text-white">إشعارات الحضور</Label>
        <Switch id="attendance-notifications" defaultChecked={true} />
      </div>
      <div className="flex items-center justify-between rtl">
        <Label htmlFor="message-notifications" className="arabic text-white">إشعارات الرسائل</Label>
        <Switch id="message-notifications" defaultChecked={true} />
      </div>
      <div className="flex items-center justify-between rtl">
        <Label htmlFor="activity-reminders" className="arabic text-white">تذكيرات النشاطات</Label>
        <Switch id="activity-reminders" defaultChecked={true} />
      </div>
    </CardContent>
  </Card>
);

export default NotificationSettingsCard;
