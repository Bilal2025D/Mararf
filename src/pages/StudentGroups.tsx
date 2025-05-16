
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { StudentGroupsProvider, useStudentGroups } from "@/context/StudentGroupsContext";
import AttendanceHeader from "@/components/students/AttendanceHeader";
import StudentGroupsWrapper from "@/components/students/StudentGroupsWrapper";

const StudentGroupsContent = () => {
  const [activeTab, setActiveTab] = useState("group1");
  const { showAttendance, setShowAttendance } = useStudentGroups();

  const toggleAttendance = () => {
    setShowAttendance(!showAttendance);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        <div className="flex items-center rtl">
          <Link to="/" className="mr-3">
            <ChevronLeft className="h-6 w-6 text-emerald-700" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold arabic text-emerald-800 flex items-center gap-2">
            <Users className="h-5 w-5" />
            قائمة الفوجين
          </h1>
        </div>
        <Button 
          onClick={toggleAttendance}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rtl arabic w-full sm:w-auto"
        >
          {showAttendance ? "عرض القائمة العادية" : "تسجيل الحضور والغياب"}
        </Button>
      </div>

      {showAttendance && <AttendanceHeader />}

      <StudentGroupsWrapper activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const StudentGroups = () => {
  return (
    <MainLayout>
      <StudentGroupsProvider>
        <StudentGroupsContent />
      </StudentGroupsProvider>
    </MainLayout>
  );
};

export default StudentGroups;
