// import { api } from "@/lib/api";
// import type { User } from "@/lib/mock-data";

// export const usersService = {
//   // Get all users
//   getAll: async (): Promise<User[]> => {
//     const res = await api.get("/users");
//     return res.data;
//   },

//   // Get user by ID
//   getById: async (id: string): Promise<User> => {
//     const res = await api.get(`/users/${id}`);
//     return res.data;
//   },

//   // Create new user
//   create: async (data: Omit<User, "id">): Promise<User> => {
//     const res = await api.post("/users", data);
//     return res.data;
//   },

//   // Update user
//   update: async (id: string, data: Partial<User>): Promise<User> => {
//     const res = await api.put(`/users/${id}`, data);
//     return res.data;
//   },

//   // Delete user
//   delete: async (id: string): Promise<void> => {
//     await api.delete(`/users/${id}`);
//   },

//   // Get users by role
//   getByRole: async (role: string): Promise<User[]> => {
//     const res = await api.get(`/users/role/${role}`);
//     return res.data;
//   },

//   // Get users by department
//   getByDepartment: async (department: string): Promise<User[]> => {
//     const res = await api.get(`/users/department/${department}`);
//     return res.data;
//   },

//   // Get current user profile
//   getProfile: async (): Promise<User> => {
//     const res = await api.get("/users/profile");
//     return res.data;
//   },

//   // Update current user profile
//   updateProfile: async (data: Partial<User>): Promise<User> => {
//     const res = await api.put("/users/profile", data);
//     return res.data;
//   },
// };

import { api } from "@/lib/api";
import type { User } from "@/lib/types/user"; // ✅ FIXED

// helper to normalize backend response
const extract = <T>(res: any): T => {
  return res.data?.payload ?? res.data ?? null;
};

export const usersService = {
  // Get all users (paginated, ADMIN)
  getAll: async (params?: any): Promise<User[]> => {
    const res = await api.get("/users", { params });
    return extract<User[]>(res) || [];
  },

  // Get current authenticated user
  getMe: async (): Promise<User> => {
    const res = await api.get("/users/me");
    return extract<User>(res);
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    const res = await api.get(`/users/${id}`);
    return extract<User>(res);
  },

  // Create a new user
  create: async (data: Omit<User, "id">): Promise<User> => {
    const res = await api.post("/users", data);
    return extract<User>(res);
  },

  // Update a user
  update: async (id: string, data: Partial<User>): Promise<User> => {
    const res = await api.put(`/users/${id}`, data);
    return extract<User>(res);
  },

  // Delete a user
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  // ✅ Create user
  create: async (data: Omit<User, "id">): Promise<User> => {
    const res = await api.post("/users", data);
    return extract<User>(res);
  },

  // ✅ Update user
  update: async (id: string, data: Partial<User>): Promise<User> => {
    const res = await api.put(`/users/${id}`, data);
    return extract<User>(res);
  },

  // ✅ Delete user
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  // ✅ Get users by role
  getByRole: async (role: string): Promise<User[]> => {
    const res = await api.get(`/users/role/${role}`);
    return extract<User[]>(res) || [];
  },

  // ✅ Get users by department
  getByDepartment: async (department: string): Promise<User[]> => {
    const res = await api.get(`/users/department/${department}`);
    return extract<User[]>(res) || [];
  },

  // ✅ Current profile
  getProfile: async (): Promise<User> => {
    const res = await api.get("/users/profile");
    return extract<User>(res);
  },

  // ✅ Update profile
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const res = await api.put("/users/profile", data);
    return extract<User>(res);
  },
};
