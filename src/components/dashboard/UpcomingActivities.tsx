
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

const UpcomingActivities = ({ activities }: { activities: Activity[] }) => {
  return (
    <Card className="border-gold/20 shadow-gold-soft hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-navy-50 to-transparent border-b border-gold/10">
        <CardTitle className="text-lg rtl arabic text-navy-600">الأنشطة القادمة</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gold/10">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-navy-50/10 transition-colors">
              <h4 className="font-medium text-navy-700 mb-2 rtl arabic">{activity.title}</h4>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm rtl arabic">
                  <Calendar className="h-4 w-4 ml-2 text-gold" />
                  <span className="text-navy-600">{activity.date}</span>
                </div>
                <div className="flex items-center text-sm rtl arabic">
                  <Clock className="h-4 w-4 ml-2 text-gold" />
                  <span className="text-navy-600">{activity.time}</span>
                </div>
                <div className="flex items-center text-sm rtl arabic">
                  <MapPin className="h-4 w-4 ml-2 text-gold" />
                  <span className="text-navy-600">{activity.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingActivities;
