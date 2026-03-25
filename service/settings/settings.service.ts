import { api } from "@/lib/api";
import type { ProfileForm, PasswordForm } from "@/lib/types/setting";

export const settingsService = {
  // Get user profile
  getProfile: async (): Promise<ProfileForm> => {
    const res = await api.get("/settings/profile");
    return res.data;
  },

  // Update user profile
  updateProfile: async (data: ProfileForm): Promise<ProfileForm> => {
    const res = await api.put("/settings/profile", data);
    return res.data;
  },

  // Change password
  changePassword: async (data: PasswordForm): Promise<{ success: boolean }> => {
    await api.put("/settings/password", data);
    return { success: true };
  },

  // Get notification preferences
  getNotificationPreferences: async (): Promise<{
    emailNotifications: boolean;
    pushNotifications: boolean;
    deadlineReminders: boolean;
    sessionReminders: boolean;
  }> => {
    const res = await api.get("/settings/notifications");
    return res.data;
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    deadlineReminders?: boolean;
    sessionReminders?: boolean;
  }): Promise<void> => {
    await api.put("/settings/notifications", preferences);
  },

  // Get system settings (admin only)
  getSystemSettings: async (): Promise<{
    allowSelfRegistration: boolean;
    sessionTimeout: number;
    maxFileSize: number;
    supportedFileTypes: string[];
  }> => {
    const res = await api.get("/settings/system");
    return res.data;
  },

  // Update system settings (admin only)
  updateSystemSettings: async (settings: {
    allowSelfRegistration?: boolean;
    sessionTimeout?: number;
    maxFileSize?: number;
    supportedFileTypes?: string[];
  }): Promise<void> => {
    await api.put("/settings/system", settings);
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File): Promise<{ avatarUrl: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/settings/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};