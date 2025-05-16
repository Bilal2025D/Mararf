
export interface Activity {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

export interface AttendanceRecord {
  id: number;
  name: string;
  status: "present" | "absent" | "late";
  type: "عضو" | "طالب" | "teacher" | "student";
}

export interface Member {
  id: string;
  name: string;
  email: string | null;
  app_role: string;
  phone?: string;
  status?: string;
  type?: string;
}
