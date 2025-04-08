import { create } from "zustand";
import type { MessageInstance } from "antd/es/message/interface";

interface AlertStore {
  notificationApi: MessageInstance;
  setNotificationApi: (notificationApi: MessageInstance) => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  notificationApi: null,
  setNotificationApi: (notificationApi) => set({ notificationApi })
}));
