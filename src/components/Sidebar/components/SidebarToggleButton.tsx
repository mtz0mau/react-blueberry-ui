import { Button } from "components/Button/Button";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebarStore } from "components/Sidebar/stores/Sidebar.store";

export const SidebarToggleButton = () => {
  const collapsed = useSidebarStore((state) => state.collapsed);
  const setCollapsed = useSidebarStore((state) => state.setCollapsed);

  return (
    <Button
      icon={<AiOutlineMenu/>}
      onClick={() => {
        setCollapsed(!collapsed);
      }}
    />
  );
};
