import { useDrawerStore } from "components/Drawer/stores/Drawer.store";
import { Drawer } from "antd";
import { DrawerSizeTypeValues } from "components/Drawer/types/DrawerSizeType";
import { IDrawer } from "components/Drawer/interfaces/IDrawer";

export const DrawerContainer = () => {
  const drawers = useDrawerStore((state) => state.drawers);
  const setDrawers = useDrawerStore((state) => state.setDrawers);

  return (
    <>
      {drawers.map((drawer: IDrawer, i) => (
        <Drawer
          key={i}
          open
          title={drawer.title}
          onClose={() => {
            setDrawers(drawers.slice(0, -1));
          }}
          styles={{
            mask: {
              backdropFilter: 'blur(2px)'
            }
          }}
          width={DrawerSizeTypeValues[drawer.size || 'md']}
          closeIcon={drawer.hideCloseButton ? null : undefined}
        >
          {drawer.content}
        </Drawer>
      ))}
    </>
  );
};
