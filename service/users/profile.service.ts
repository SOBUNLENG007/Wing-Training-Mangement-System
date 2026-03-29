import { api } from "@/lib/api";

export const profileService = {
  // Get current authenticated user profile
  getProfile: async () => {
    const res = await api.get("/profile");
    return res.data;
  },
};
