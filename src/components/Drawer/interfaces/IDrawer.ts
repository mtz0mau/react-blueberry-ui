import React from "react";
import { DrawerSizeType } from "components/Drawer/types/DrawerSizeType";

export interface IDrawer {
  title: string;
  content?: string | React.ReactNode;
  hideCloseButton?: boolean;
  size?: DrawerSizeType;
}
