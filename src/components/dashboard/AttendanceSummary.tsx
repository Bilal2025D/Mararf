
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { AttendanceRecord } from "@/types";

const AttendanceSummary = ({ records }: { records: AttendanceRecord[] }) => {
  return (
    <Card className="border-gold/20 shadow-gold-soft hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3 bg-gradient-to-r from-navy-50 to-transparent border-b border-gold/10">
        <CardTitle className="text-lg rtl arabic text-navy-600">ملخص الحضور اليومي</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gold/10">
          {records.map((record) => (
            <div key={record.id} className="p-3 flex justify-between items-center hover:bg-navy-50/10 transition-colors">
              <div className="flex items-center space-x-2 rtl arabic">
                <div className="text-sm font-medium text-navy-700">{record.name}</div>
                <div className="text-xs text-navy-500">
                  {record.type}
                </div>
              </div>
              <div>
                {record.status === 'present' && (
                  <span className="inline-flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs arabic">حاضر</span>
                  </span>
                )}
                {record.status === 'absent' && (
                  <span className="inline-flex items-center text-red-600">
                    <XCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs arabic">غائب</span>
                  </span>
                )}
                {record.status === 'late' && (
                  <span className="inline-flex items-center text-amber-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-xs arabic">متأخر</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceSummary;
