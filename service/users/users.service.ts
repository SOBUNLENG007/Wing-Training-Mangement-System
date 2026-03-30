import { api } from "@/lib/api";
import type { User } from "@/lib/types/user";
import { getPayload } from "@/lib/auth";

// helper to normalize backend response
const extract = <T>(res: any): T | null => {
  // Prefer payload, then data, then null
  const data = res?.data?.payload ?? res?.data ?? null;
  // Defensive: if data is empty object, treat as null
  if (data && typeof data === "object" && Object.keys(data).length === 0) {
    return null;
  }
  return data;
};

export const usersService = {
  // Get all users (paginated, ADMIN)
  getAll: async (params?: any): Promise<User[]> => {
    const res = await api.get("/users", { params });
    return extract<User[]>(res) || [];
  },

  // Get current authenticated user
  getMe: async (): Promise<User | null> => {
    const res = await api.get("/users/me");
    return extract<User>(res);
  },

  // Get user by ID
  getById: async (id: string): Promise<User | null> => {
    const res = await api.get(`/users/${id}`);
    return extract<User>(res);
  },

  // Create a new user
  create: async (data: Omit<User, "id">): Promise<User | null> => {
    const res = await api.post("/users", data);
    return extract<User>(res);
  },

  // Update a user
  update: async (id: string, data: Partial<User>): Promise<User | null> => {
    const res = await api.put(`/users/${id}`, data);
    return extract<User>(res);
  },

  // Delete a user
  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },

  // (Removed duplicate create, update, delete)

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

  // ✅ Current profile (by ID from JWT, supports user_id or id)
  getProfile: async (): Promise<User | null> => {
    const payload = getPayload();
    // @ts-expect-error: user_id may exist on some JWTs
    const id = payload?.id || payload?.user_id;
    if (!id) {
      return null;
    }
    const res = await api.get(`/users/${id}`);
    const user = extract<User>(res);
    if (!user || !user.id || !user.email) {
      return null;
    }
    return user;
  },

  // ✅ Update profile
  updateProfile: async (data: Partial<User>): Promise<User | null> => {
    const res = await api.put("/users/profile", data);
    return extract<User>(res);
  },
};
