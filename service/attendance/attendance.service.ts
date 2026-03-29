import { api } from "@/lib/api";
import type { AttendanceRecord } from "@/lib/mock-data";

export const attendanceService = {
  // Get all attendance records (paginated)
  getAll: async (params?: any): Promise<AttendanceRecord[]> => {
    const res = await api.get("/attendance", { params });
    return res.data;
  },

  // Get attendance by session (paginated)
  getBySession: async (
    sessionId: string,
    params?: any,
  ): Promise<AttendanceRecord[]> => {
    const res = await api.get(`/attendance/session/${sessionId}`, { params });
    return res.data;
  },

  // Get attendance by user (paginated)
  getByUser: async (
    userId: string,
    params?: any,
  ): Promise<AttendanceRecord[]> => {
    const res = await api.get(`/attendance/user/${userId}`, { params });
    return res.data;
  },

  // Get attendance by ID
  getById: async (id: string): Promise<AttendanceRecord> => {
    const res = await api.get(`/attendance/${id}`);
    return res.data;
  },

  // Mark attendance (ADMIN or TRAINER)
  create: async (data: any): Promise<AttendanceRecord> => {
    const res = await api.post("/attendance", data);
    return res.data;
  },

  // Update attendance (ADMIN or TRAINER)
  update: async (id: string, data: any): Promise<AttendanceRecord> => {
    const res = await api.put(`/attendance/${id}`, data);
    return res.data;
  },

  // Delete attendance (ADMIN or TRAINER)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/attendance/${id}`);
  },
};
