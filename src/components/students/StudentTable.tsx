
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useStudentGroups, Student } from "@/context/StudentGroupsContext";
import StudentRow from "./StudentRow";
import { Table, TableHeader, TableBody, TableHead, TableRow } from "@/components/ui/table";

interface StudentTableProps {
  groupName: string;
  groupTitle: string;
  groupData: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ groupName, groupTitle, groupData }) => {
  const { showAttendance } = useStudentGroups();

  return (
    <Card className="border-emerald-100 shadow-md overflow-hidden">
      <CardHeader className="bg-emerald-50 p-3 text-center">
        <div className="text-lg font-bold arabic text-emerald-800">
          {groupTitle}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table className="w-full text-right">
            <TableHeader className="bg-emerald-50">
              <TableRow>
                <TableHead className="p-3 w-[40px] arabic text-center font-medium text-emerald-900">#</TableHead>
                <TableHead className="p-3 arabic font-medium text-emerald-900">الاسم و اللقب</TableHead>
                {!showAttendance && (
                  <>
                    <TableHead className="p-3 w-[40px] arabic text-center font-medium text-emerald-900 hidden md:table-cell">#</TableHead>
                    <TableHead className="p-3 arabic font-medium text-emerald-900 hidden md:table-cell">الاسم و اللقب</TableHead>
                  </>
                )}
                {showAttendance && (
                  <TableHead className="p-3 arabic font-medium text-emerald-900">الحضور</TableHead>
                )}
                <TableHead className="p-3 w-auto md:w-1/6 arabic font-medium text-emerald-900">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupData.map((student) => (
                <StudentRow 
                  key={student.id} 
                  student={student} 
                  group={groupName as "group1" | "group2"} 
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentTable;
