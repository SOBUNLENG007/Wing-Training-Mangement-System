import { api } from "@/lib/api";
import type { TrainingSession } from "@/lib/types/session";

export const sessionsService = {
  // Get all sessions (paginated)
  getAll: async (params?: any): Promise<TrainingSession[]> => {
    const res = await api.get("/sessions", { params });
    return res.data?.payload ?? res.data ?? [];
  },

  // Get session by ID
  getById: async (id: string | number): Promise<TrainingSession> => {
    const res = await api.get(`/sessions/${id}`);
    return res.data?.payload ?? res.data;
  },

  // Create a new session (ADMIN)
  create: async (data: any): Promise<TrainingSession> => {
    const res = await api.post("/sessions", data);
    return res.data?.payload ?? res.data;
  },

  // Update a session (ADMIN)
  update: async (id: string | number, data: any): Promise<TrainingSession> => {
    const res = await api.put(`/sessions/${id}`, data);
    return res.data?.payload ?? res.data;
  },

  // Delete a session (ADMIN)
  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/sessions/${id}`);
  },

  // Enroll (EMPLOYEE)
  enroll: async (sessionId: string | number): Promise<void> => {
    await api.post(`/sessions/${sessionId}/enroll`);
  },

  // Unenroll
  unenroll: async (sessionId: string | number): Promise<void> => {
    await api.delete(`/sessions/${sessionId}/enroll`);
  },
};
