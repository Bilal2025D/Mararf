
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X, CheckCircle, XCircle, Clock } from "lucide-react";
import { useStudentGroups, Student } from "@/context/StudentGroupsContext";
import { TableRow, TableCell } from "@/components/ui/table";

interface StudentRowProps {
  student: Student;
  group: "group1" | "group2";
}

const StudentRow: React.FC<StudentRowProps> = ({ student, group }) => {
  const { 
    showAttendance, 
    toggleEdit, 
    handleNameChange, 
    saveChanges, 
    changeAttendanceStatus 
  } = useStudentGroups();

  return (
    <TableRow className="border-b border-emerald-100 hover:bg-emerald-50/20">
      <TableCell className="p-3 text-center arabic">{student.id}</TableCell>
      <TableCell className="p-3 arabic">
        {student.editing ? (
          <Input 
            value={student.name} 
            onChange={(e) => handleNameChange(student.id, group, e.target.value, 'left')}
            className="rtl arabic"
          />
        ) : (
          student.name
        )}
      </TableCell>
      
      {!showAttendance && (
        <>
          <TableCell className="p-3 text-center arabic hidden md:table-cell">{student.id}</TableCell>
          <TableCell className="p-3 arabic hidden md:table-cell">
            {student.editing ? (
              <Input 
                value={student.nameRight || ''} 
                onChange={(e) => handleNameChange(student.id, group, e.target.value, 'right')}
                className="rtl arabic"
              />
            ) : (
              student.nameRight
            )}
          </TableCell>
        </>
      )}
      
      {showAttendance && (
        <TableCell className="p-3 arabic">
          <div className="flex items-center gap-2 rtl">
            {student.status === 'present' ? (
              <span className="text-green-600 flex items-center">
                <CheckCircle size={16} className="ml-1" />
                <span className="hidden sm:inline">حاضر</span>
              </span>
            ) : student.status === 'absent' ? (
              <span className="text-red-600 flex items-center">
                <XCircle size={16} className="ml-1" />
                <span className="hidden sm:inline">غائب</span>
              </span>
            ) : (
              <span className="text-amber-600 flex items-center">
                <Clock size={16} className="ml-1" />
                <span className="hidden sm:inline">متأخر</span>
              </span>
            )}
          </div>
        </TableCell>
      )}
      
      <TableCell className="p-3">
        <div className="flex flex-wrap gap-1 md:gap-2 justify-end">
          {!showAttendance ? (
            student.editing ? (
              <>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 px-1 md:px-2 text-emerald-600 hover:text-emerald-800"
                  onClick={() => saveChanges(student.id, group)}
                >
                  <Save size={16} className="ml-1" />
                  <span className="hidden sm:inline">حفظ</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="h-8 px-1 md:px-2 text-red-600 hover:text-red-800"
                  onClick={() => toggleEdit(student.id, group)}
                >
                  <X size={16} className="ml-1" />
                  <span className="hidden sm:inline">إلغاء</span>
                </Button>
              </>
            ) : (
              <Button 
                size="sm" 
                variant="ghost"
                className="h-8 px-1 md:px-2 text-emerald-600 hover:text-emerald-800"
                onClick={() => toggleEdit(student.id, group)}
              >
                <Edit size={16} className="ml-1" />
                <span className="hidden sm:inline">تعديل</span>
              </Button>
            )
          ) : (
            <>
              <Button
                size="sm"
                variant={student.status === 'present' ? 'default' : 'outline'}
                className={`h-8 px-1 md:px-2 ${student.status === 'present' ? 'bg-green-600 hover:bg-green-700' : 'border-green-200 text-green-600'}`}
                onClick={() => changeAttendanceStatus(student.id, group, "present")}
              >
                <CheckCircle size={14} className="sm:hidden" />
                <span className="hidden sm:inline">حاضر</span>
              </Button>
              <Button
                size="sm"
                variant={student.status === 'late' ? 'default' : 'outline'}
                className={`h-8 px-1 md:px-2 ${student.status === 'late' ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-200 text-amber-600'}`}
                onClick={() => changeAttendanceStatus(student.id, group, "late")}
              >
                <Clock size={14} className="sm:hidden" />
                <span className="hidden sm:inline">متأخر</span>
              </Button>
              <Button
                size="sm"
                variant={student.status === 'absent' ? 'default' : 'outline'}
                className={`h-8 px-1 md:px-2 ${student.status === 'absent' ? 'bg-red-600 hover:bg-red-700' : 'border-red-200 text-red-600'}`}
                onClick={() => changeAttendanceStatus(student.id, group, "absent")}
              >
                <XCircle size={14} className="sm:hidden" />
                <span className="hidden sm:inline">غائب</span>
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StudentRow;
