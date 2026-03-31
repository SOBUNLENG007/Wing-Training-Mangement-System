import { api } from "@/lib/api";
import type { Material } from "@/lib/types/material";

export const materialsService = {
  // Get all materials (paginated)
  getAll: async (params?: any): Promise<Material[]> => {
    const res = await api.get("/materials", { params });
    // Always return an array
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.payload)) return res.data.payload;
    return [];
  },

  // Get material by ID
  getById: async (id: string): Promise<Material> => {
    const res = await api.get(`/materials/${id}`);
    return res.data;
  },

  // Get materials by session (paginated)
  getBySession: async (
    sessionId: string,
    params?: any,
  ): Promise<Material[]> => {
    const res = await api.get(`/materials/session/${sessionId}`, { params });
    return res.data;
  },

  // Create new material (ADMIN or TRAINER)
  create: async (data: {
    title: string;
    fileUrl: string;
    sessionId: string;
    trainerId: number;
  }): Promise<any> => {
    const res = await api.post("/materials", data);
    return res.data;
  },

  // Update material (ADMIN or TRAINER)
  update: async (id: string, data: Partial<Material>): Promise<Material> => {
    const res = await api.put(`/materials/${id}`, data);
    return res.data;
  },

  // Delete material (ADMIN or TRAINER)
  delete: async (id: string): Promise<void> => {
    await api.delete(`/materials/${id}`);
  },
};
