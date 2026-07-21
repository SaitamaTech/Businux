import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsState {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (item: Omit<NotificationItem, "id" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [
        {
          id: "n1",
          title: "New sales forecast ready",
          message: "Your Q3 revenue forecast is available in Reports.",
          time: "2m ago",
          read: false,
        },
        {
          id: "n2",
          title: "New lead assigned",
          message: "A new lead has been assigned to your sales team.",
          time: "25m ago",
          read: false,
        },
      ],
      unreadCount: 2,
      addNotification: (item) => {
        const next = [{ id: crypto.randomUUID(), read: false, ...item }, ...get().notifications];
        set({ notifications: next, unreadCount: next.filter((notification) => !notification.read).length });
      },
      markAsRead: (id) => {
        const notifications = get().notifications.map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification
        );
        set({ notifications, unreadCount: notifications.filter((notification) => !notification.read).length });
      },
      markAllRead: () => {
        const notifications = get().notifications.map((notification) => ({ ...notification, read: true }));
        set({ notifications, unreadCount: 0 });
      },
    }),
    {
      name: "businux-notifications",
    }
  )
);
