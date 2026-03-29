import { api } from "@/lib/api";

export const submissionsService = {
  // Get all submissions (paginated, ADMIN or TRAINER)
  getAll: async (params?: any) => {
    const res = await api.get("/submissions", { params });
    return res.data;
  },

  // Get submissions by assignment (ADMIN or TRAINER)
  getByAssignment: async (assignmentId: string, params?: any) => {
    const res = await api.get(`/submissions/assignment/${assignmentId}`, {
      params,
    });
    return res.data;
  },

  // Get submissions by employee
  getByEmployee: async (employeeId: string, params?: any) => {
    const res = await api.get(`/submissions/employee/${employeeId}`, {
      params,
    });
    return res.data;
  },

  // Get submission by ID
  getById: async (id: string) => {
    const res = await api.get(`/submissions/${id}`);
    return res.data;
  },

  // Submit an assignment (Employee)
  create: async (data: any) => {
    const res = await api.post("/submissions", data);
    return res.data;
  },

  // Update a submission (ADMIN or TRAINER)
  update: async (id: string, data: any) => {
    const res = await api.put(`/submissions/${id}`, data);
    return res.data;
  },

  // Delete a submission (ADMIN or TRAINER)
  delete: async (id: string) => {
    await api.delete(`/submissions/${id}`);
  },
};
