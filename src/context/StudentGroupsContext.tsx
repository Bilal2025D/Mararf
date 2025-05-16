
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

// Type definitions
export interface Student {
  id: number;
  name: string;
  nameRight?: string;
  status?: "present" | "absent" | "late";
  editing?: boolean;
}

interface StudentGroupsContextType {
  groupOneData: Student[];
  setGroupOneData: React.Dispatch<React.SetStateAction<Student[]>>;
  groupTwoData: Student[];
  setGroupTwoData: React.Dispatch<React.SetStateAction<Student[]>>;
  showAttendance: boolean;
  setShowAttendance: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  toggleEdit: (id: number, group: string) => void;
  handleNameChange: (id: number, group: string, value: string, side: 'left' | 'right') => void;
  saveChanges: (id: number, group: string) => void;
  changeAttendanceStatus: (id: number, group: string, status: "present" | "absent" | "late") => void;
  nextDay: () => void;
  prevDay: () => void;
  formatDate: (date: Date) => string;
}

const StudentGroupsContext = createContext<StudentGroupsContextType | undefined>(undefined);

export const useStudentGroups = () => {
  const context = useContext(StudentGroupsContext);
  if (!context) {
    throw new Error("useStudentGroups must be used within a StudentGroupsProvider");
  }
  return context;
};

interface StudentGroupsProviderProps {
  children: ReactNode;
}

export const StudentGroupsProvider: React.FC<StudentGroupsProviderProps> = ({ children }) => {
  const { toast } = useToast();
  const [showAttendance, setShowAttendance] = useState(false);
  const [date, setDate] = useState(new Date());

  // بيانات الفوج الأول
  const [groupOneData, setGroupOneData] = useState<Student[]>([
    { id: 1, name: "بعلي يحيى فؤاد", nameRight: "لكحل محمد جواد", status: "present" },
    { id: 2, name: "بعلي محمد الأمين", nameRight: "لكحل حسين عبد النور", status: "present" },
    { id: 3, name: "بعلي مصعب", nameRight: "رضوان صالح إسحاق", status: "present" },
    { id: 4, name: "بعلي مقيم", nameRight: "نكاع خالد", status: "absent" },
    { id: 5, name: "بروال سراج الدين", nameRight: "نحوي جود", status: "present" },
    { id: 6, name: "بن قرة عبد الرحمان", nameRight: "نحوي جابر", status: "late" },
    { id: 7, name: "بوحصان عمر المهدي", nameRight: "نحوي أيهم", status: "present" },
    { id: 8, name: "بوطبة رسيم", nameRight: "زفزاف أنيس", status: "present" },
    { id: 9, name: "بوطبة وسيم", nameRight: "خنوني محمد جواد", status: "present" },
    { id: 10, name: "بوطبة ساجد عبد الله", nameRight: "لشطر ضياء الدين", status: "absent" },
    { id: 11, name: "بزاز يونس", nameRight: "", status: "present" },
    { id: 12, name: "بن دايرة رسيم", nameRight: "", status: "present" },
    { id: 13, name: "قروج عبيدة", nameRight: "", status: "late" },
    { id: 14, name: "لكحل ساجد", nameRight: "", status: "present" },
    { id: 15, name: "لكحل جاسر", nameRight: "", status: "present" },
  ]);

  // بيانات الفوج الثاني
  const [groupTwoData, setGroupTwoData] = useState<Student[]>([
    { id: 1, name: "بوعطية زين الدين", nameRight: "رضوان صالح آدم", status: "present" },
    { id: 2, name: "بوعطية سراج الدين", nameRight: "رضوان صالح قتيبة", status: "present" },
    { id: 3, name: "بوعطية لؤي", nameRight: "رضوان صالح حذيفة", status: "present" },
    { id: 4, name: "بوعطية الشريف", nameRight: "ضيف عبد الرزاق", status: "absent" },
    { id: 5, name: "بوعطية عبد الحي", nameRight: "ضيف إسلام", status: "present" },
    { id: 6, name: "بوعتروس معتز بالله", nameRight: "طاهير مصعب", status: "present" },
    { id: 7, name: "بوسحابة محمد عبد القادر", nameRight: "نحوي لقمان", status: "late" },
    { id: 8, name: "بوغرارة سراج الدين", nameRight: "زفزاف إسلام ضياء الدين", status: "present" },
    { id: 9, name: "بومدين هيثم", nameRight: "متياف طه", status: "present" },
    { id: 10, name: "بلعزيزية مصطفى أمين", nameRight: "متياف زين الدين", status: "present" },
    { id: 11, name: "عواشرية جاد", nameRight: "متياف عبد الرحمان", status: "absent" },
    { id: 12, name: "عربوز آدم عمار", nameRight: "", status: "present" },
    { id: 13, name: "عربوز مؤيد", nameRight: "", status: "present" },
    { id: 14, name: "لشطر هاني", nameRight: "", status: "present" },
    { id: 15, name: "لكحل أنس ابراهيم", nameRight: "", status: "present" },
  ]);

  // تحويل التاريخ إلى نص بالعربية
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // وظائف التعديل
  const toggleEdit = (id: number, group: string) => {
    if (group === "group1") {
      setGroupOneData(groupOneData.map(student => 
        student.id === id ? { ...student, editing: !student.editing } : student
      ));
    } else {
      setGroupTwoData(groupTwoData.map(student => 
        student.id === id ? { ...student, editing: !student.editing } : student
      ));
    }
  };

  const handleNameChange = (id: number, group: string, value: string, side: 'left' | 'right') => {
    if (group === "group1") {
      setGroupOneData(groupOneData.map(student => 
        student.id === id 
          ? side === 'left' 
            ? { ...student, name: value } 
            : { ...student, nameRight: value }
          : student
      ));
    } else {
      setGroupTwoData(groupTwoData.map(student => 
        student.id === id 
          ? side === 'left' 
            ? { ...student, name: value } 
            : { ...student, nameRight: value }
          : student
      ));
    }
  };

  const saveChanges = (id: number, group: string) => {
    toggleEdit(id, group);
    toast({
      title: "تم الحفظ",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  // وظائف تسجيل الحضور
  const changeAttendanceStatus = (id: number, group: string, status: "present" | "absent" | "late") => {
    if (group === "group1") {
      setGroupOneData(groupOneData.map(student => 
        student.id === id ? { ...student, status } : student
      ));
    } else {
      setGroupTwoData(groupTwoData.map(student => 
        student.id === id ? { ...student, status } : student
      ));
    }

    toast({
      title: "تم تحديث الحضور",
      description: status === "present" 
        ? "تم تسجيل الحضور بنجاح" 
        : status === "absent" 
          ? "تم تسجيل الغياب بنجاح" 
          : "تم تسجيل التأخير بنجاح",
    });
  };

  // زر اضغط يوم للأمام
  const nextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  // زر اضغط يوم للوراء
  const prevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const value = {
    groupOneData,
    setGroupOneData,
    groupTwoData,
    setGroupTwoData,
    showAttendance,
    setShowAttendance,
    date,
    setDate,
    toggleEdit,
    handleNameChange,
    saveChanges,
    changeAttendanceStatus,
    nextDay,
    prevDay,
    formatDate,
  };

  return (
    <StudentGroupsContext.Provider value={value}>
      {children}
    </StudentGroupsContext.Provider>
  );
};
