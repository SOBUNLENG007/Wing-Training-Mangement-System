import { api } from "@/lib/api";
import type { Material } from "@/lib/types/material";

export const materialsService = {
  // Get all materials
  getAll: async (): Promise<Material[]> => {
    const res = await api.get("/materials");
    return res.data;
  },

  // Get material by ID
  getById: async (id: string): Promise<Material> => {
    const res = await api.get(`/materials/${id}`);
    return res.data;
  },

  // Get materials by session
  getBySession: async (sessionId: string): Promise<Material[]> => {
    const res = await api.get(`/materials/session/${sessionId}`);
    return res.data;
  },

  // Create new material
  create: async (data: Omit<Material, "id">): Promise<Material> => {
    const res = await api.post("/materials", data);
    return res.data;
  },

  // Update material
  update: async (id: string, data: Partial<Material>): Promise<Material> => {
    const res = await api.put(`/materials/${id}`, data);
    return res.data;
  },

  // Delete material
  delete: async (id: string): Promise<void> => {
    await api.delete(`/materials/${id}`);
  },

  // Upload file
  uploadFile: async (file: File, sessionId: string): Promise<Material> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sessionId", sessionId);

    const res = await api.post("/materials/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Download material
  download: async (id: string): Promise<Blob> => {
    const res = await api.get(`/materials/${id}/download`, {
      responseType: "blob",
    });
    return res.data;
  },

  // Get materials by department
  getByDepartment: async (department: string): Promise<Material[]> => {
    const res = await api.get(`/materials/department/${department}`);
    return res.data;
  },
};