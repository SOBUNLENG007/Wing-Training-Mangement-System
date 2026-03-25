// lib/types/attendance.ts
export type AttendanceStatus = "present" | "absent" | "late";

export interface AttendanceRecord {
  id: string;
  sessionTitle: string;
  date: string;
  status: AttendanceStatus;
  employee: string;
  sessionId?: string;
  employeeId?: string;
  notes?: string;
}