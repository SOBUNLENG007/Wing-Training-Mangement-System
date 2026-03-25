import { api } from "@/lib/api";
import type { AttendanceRecord } from "@/lib/mock-data";

export const attendanceService = {
  // Get all attendance records
  getAll: async (): Promise<AttendanceRecord[]> => {
    const res = await api.get("/attendance");
    return res.data;
  },

  // Get attendance by session
  getBySession: async (sessionId: string): Promise<AttendanceRecord[]> => {
    const res = await api.get(`/attendance/session/${sessionId}`);
    return res.data;
  },

  // Get attendance by user
  getByUser: async (userId: string): Promise<AttendanceRecord[]> => {
    const res = await api.get(`/attendance/user/${userId}`);
    return res.data;
  },

  // Get my attendance (current user)
  getMyAttendance: async (): Promise<AttendanceRecord[]> => {
    const res = await api.get("/attendance/my");
    return res.data;
  },

  // Mark attendance
  markAttendance: async (sessionId: string, status: "present" | "absent" | "late"): Promise<AttendanceRecord> => {
    const res = await api.post(`/attendance/session/${sessionId}`, { status });
    return res.data;
  },

  // Update attendance
  update: async (id: string, status: "present" | "absent" | "late"): Promise<AttendanceRecord> => {
    const res = await api.put(`/attendance/${id}`, { status });
    return res.data;
  },

  // Get attendance summary
  getSummary: async (params?: {
    startDate?: string;
    endDate?: string;
    department?: string;
  }): Promise<{
    totalSessions: number;
    presentCount: number;
    absentCount: number;
    lateCount: number;
    attendanceRate: number;
  }> => {
    const res = await api.get("/attendance/summary", { params });
    return res.data;
  },

  // Bulk mark attendance
  bulkMarkAttendance: async (records: Array<{ sessionId: string; userId: string; status: "present" | "absent" | "late" }>): Promise<void> => {
    await api.post("/attendance/bulk", { records });
  },
};