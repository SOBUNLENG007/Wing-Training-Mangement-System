import { api } from "@/lib/api";

export const notificationsService = {
  // Get all notifications (ADMIN, paginated)
  getAll: async (params?: any) => {
    const res = await api.get("/notifications", { params });
    return res.data;
  },

  // Get notifications for a user
  getByUser: async (userId: string) => {
    const res = await api.get(`/notifications/user/${userId}`);
    return res.data;
  },

  // Get unread notifications for a user
  getUnreadByUser: async (userId: string) => {
    const res = await api.get(`/notifications/user/${userId}/unread`);
    return res.data;
  },

  // Create a notification
  create: async (data: any) => {
    const res = await api.post("/notifications", data);
    return res.data;
  },

  // Update a notification
  update: async (id: string, data: any) => {
    const res = await api.put(`/notifications/${id}`, data);
    return res.data;
  },

  // Delete a notification
  delete: async (id: string) => {
    await api.delete(`/notifications/${id}`);
  },

  // Mark a notification as read
  markAsRead: async (id: string) => {
    const res = await api.patch(`/notifications/${id}/read`);
    return res.data;
  },

  // Mark all notifications as read for a user
  markAllAsRead: async (userId: string) => {
    const res = await api.patch(`/notifications/user/${userId}/read-all`);
    return res.data;
  },

  // Bulk delete notifications
  deleteMany: async (ids: string[]) => {
    const res = await api.post(`/notifications/delete-many`, { ids });
    return res.data;
  },
};
