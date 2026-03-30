import { api } from "@/lib/api";

export interface Department {
  id: number;
  name: string;
  description?: string;
  status: boolean;
}

export const departmentService = {
  // Get all departments
  getAll: async (): Promise<Department[]> => {
    const res = await api.get("/departments");
    return res.data;
  },

  // Get department by ID
  getById: async (id: string): Promise<Department> => {
    const res = await api.get(`/departments/${id}`);
    return res.data;
  },

  // Get department by user ID
  getByUserId: async (userId: number | string): Promise<Department | null> => {
    const res = await api.get(`/departments/by-user-id/${userId}`);
    if (res.data?.payload) return res.data.payload as Department;
    if (res.data && res.data.id) return res.data as Department;
    return null;
  },

  // Create a new department
  create: async (data: Omit<Department, "id">): Promise<Department> => {
    const res = await api.post("/departments", data);
    return res.data;
  },

  // Update a department
  update: async (
    id: string,
    data: Partial<Department>,
  ): Promise<Department> => {
    const res = await api.put(`/departments/${id}`, data);
    return res.data;
  },

  // Delete a department
  delete: async (id: string): Promise<void> => {
    await api.delete(`/departments/${id}`);
  },
};
