import { api } from "@/lib/api";

export interface Department {
  id: number;
  name: string;
  description?: string;
  status: boolean;
}

export const departmentService = {
  async getAll(): Promise<Department[]> {
    const response = await api.get("/departments");
    return response.data;
  },
};