import { api } from "@/lib/api";
import type { Assignment } from "@/lib/types/assignment";

export const assignmentsService = {
  // Get all assignments (paginated)
  getAll: async (params?: any): Promise<Assignment[]> => {
    const res = await api.get("/assignments", { params });
    return res.data;
  },

  // Get assignments by session (paginated)
  getBySession: async (
    sessionId: string,
    params?: any,
  ): Promise<Assignment[]> => {
    const res = await api.get(`/assignments/session/${sessionId}`, { params });
    return res.data;
  },

  // Get assignment by ID
  getById: async (id: string): Promise<Assignment> => {
    const res = await api.get(`/assignments/${id}`);
    return res.data;
  },

  // Create a new assignment (ADMIN or TRAINER)
  create: async (data: Omit<Assignment, "id">): Promise<Assignment> => {
    const res = await api.post("/assignments", data);
    return res.data;
  },

  // Update an assignment (ADMIN or TRAINER)
  update: async (
    id: string,
    data: Partial<Assignment>,
  ): Promise<Assignment> => {
    const res = await api.put(`/assignments/${id}`, data);
    return res.data;
  },

  // Delete an assignment (ADMIN or TRAINER)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/assignments/${id}`);
  },
};
