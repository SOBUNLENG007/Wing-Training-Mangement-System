import { api } from "@/lib/api";
import type { Assignment } from "@/lib/types/assignment";

export const assignmentsService = {
  // Get all assignments
  getAll: async (): Promise<Assignment[]> => {
    const res = await api.get("/assignments");
    return res.data;
  },

  // Get assignment by ID
  getById: async (id: string): Promise<Assignment> => {
    const res = await api.get(`/assignments/${id}`);
    return res.data;
  },

  // Get assignments by session
  getBySession: async (sessionId: string): Promise<Assignment[]> => {
    const res = await api.get(`/assignments/session/${sessionId}`);
    return res.data;
  },

  // Create new assignment
  create: async (data: Omit<Assignment, "id">): Promise<Assignment> => {
    const res = await api.post("/assignments", data);
    return res.data;
  },

  // Update assignment
  update: async (id: string, data: Partial<Assignment>): Promise<Assignment> => {
    const res = await api.put(`/assignments/${id}`, data);
    return res.data;
  },

  // Delete assignment
  delete: async (id: string): Promise<void> => {
    await api.delete(`/assignments/${id}`);
  },

  // Submit assignment
  submit: async (assignmentId: string, submission: any): Promise<void> => {
    await api.post(`/assignments/${assignmentId}/submit`, submission);
  },

  // Grade assignment
  grade: async (assignmentId: string, grade: { score: number; feedback?: string }): Promise<void> => {
    await api.post(`/assignments/${assignmentId}/grade`, grade);
  },

  // Get assignments by status
  getByStatus: async (status: string): Promise<Assignment[]> => {
    const res = await api.get(`/assignments/status/${status}`);
    return res.data;
  },

  // Get my assignments (for current user)
  getMyAssignments: async (): Promise<Assignment[]> => {
    const res = await api.get("/assignments/my");
    return res.data;
  },
};