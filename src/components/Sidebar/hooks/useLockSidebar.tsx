import { useSidebarStore } from "components/Sidebar/stores/Sidebar.store";
import { useEffect } from "react";

export const useLockSidebar = (locked: boolean, collapsed?: boolean) => {
  const lockSidebar = useSidebarStore((state) => state.lockSidebar);

  useEffect(() => {
    lockSidebar(true, true);

    return () => {
      lockSidebar(false, false);
    };
  }, []);
};
