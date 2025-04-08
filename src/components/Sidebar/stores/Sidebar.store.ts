import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SidebarStore {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;

  showToggle: boolean;
  setShowToggle: (showToggle: boolean) => void;

  locked: boolean;
  lockSidebar: (locked: boolean, collapsed?: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      collapsed: false,
      setCollapsed: (collapsed) => set({ collapsed }),

      showToggle: true,
      setShowToggle: (showToggle) => set({ showToggle }),

      locked: false,
      lockSidebar: (locked, collapsed = false) => {
        set({ locked, collapsed });
      }
    }),
    {
      name: 'sidebar-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        collapsed: state.collapsed,
        showToggle: state.showToggle
      })
    }
  )
);
