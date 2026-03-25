import { api } from "@/lib/api";
import type { Notification } from "@/lib/types/notification";

export async function getNotifications(): Promise<{ payload: Notification[] }> {
  const res = await api.get("/notifications");
  return { payload: res.data };
}

export async function markNotificationRead(id: string): Promise<{ success: boolean }> {
  await api.put(`/notifications/${id}/read`);
  return { success: true };
}

export async function markAllNotificationsRead(): Promise<{ success: boolean }> {
  await api.put("/notifications/read-all");
  return { success: true };
}

export async function deleteNotification(id: string): Promise<{ success: boolean }> {
  await api.delete(`/notifications/${id}`);
  return { success: true };
}

export async function getUnreadCount(): Promise<number> {
  const res = await api.get("/notifications/unread-count");
  return res.data.count;
}

export async function createNotification(notification: Omit<Notification, "id" | "timestamp" | "read">): Promise<Notification> {
  const res = await api.post("/notifications", notification);
  return res.data;
}
