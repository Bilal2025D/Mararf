
import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudentGroups } from "@/context/StudentGroupsContext";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const AttendanceHeader: React.FC = () => {
  const { date, formatDate, prevDay, nextDay, setDate } = useStudentGroups();

  return (
    <Card className="mb-6 border-emerald-100 shadow-md">
      <CardHeader className="bg-emerald-50 p-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-lg font-bold arabic text-emerald-800 text-center sm:text-right w-full sm:w-auto">
            تسجيل الحضور ليوم: {formatDate(date)}
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <Button 
              variant="outline" 
              size="sm"
              className="border-emerald-200"
              onClick={prevDay}
            >
              <ChevronRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0" />
              <span className="hidden sm:inline">اليوم السابق</span>
              <span className="sm:hidden">السابق</span>
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className="border-emerald-200"
              onClick={() => setDate(new Date())}
            >
              <Calendar className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0" />
              <span className="hidden sm:inline">اليوم</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="border-emerald-200"
              onClick={nextDay}
            >
              <span className="hidden sm:inline">اليوم التالي</span>
              <span className="sm:hidden">التالي</span>
              <ChevronLeft className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AttendanceHeader;
