import { api } from "@/lib/api";
import type { ProgressRecord } from "@/lib/mock-data";

export const progressService = {
  // Get all progress records
  getAll: async (): Promise<ProgressRecord[]> => {
    const res = await api.get("/progress");
    return res.data;
  },

  // Get progress by user ID
  getByUser: async (userId: string): Promise<ProgressRecord[]> => {
    const res = await api.get(`/progress/user/${userId}`);
    return res.data;
  },

  // Get my progress (current user)
  getMyProgress: async (): Promise<ProgressRecord[]> => {
    const res = await api.get("/progress/my");
    return res.data;
  },

  // Get progress by session
  getBySession: async (sessionId: string): Promise<ProgressRecord[]> => {
    const res = await api.get(`/progress/session/${sessionId}`);
    return res.data;
  },

  // Update progress
  update: async (sessionId: string, data: Partial<ProgressRecord>): Promise<ProgressRecord> => {
    const res = await api.put(`/progress/session/${sessionId}`, data);
    return res.data;
  },

  // Get progress summary
  getSummary: async (): Promise<{
    totalSessions: number;
    completedSessions: number;
    averageScore: number;
    completionRate: number;
  }> => {
    const res = await api.get("/progress/summary");
    return res.data;
  },

  // Get department progress
  getDepartmentProgress: async (department: string): Promise<ProgressRecord[]> => {
    const res = await api.get(`/progress/department/${department}`);
    return res.data;
  },
};