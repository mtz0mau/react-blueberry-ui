import React from "react";
import { ModalSizeType } from "components/Modal/types/ModalSizeType";

export interface IModal {
  title: string;
  content?: string | React.ReactNode;
  hideCloseButton?: boolean;
  size?: ModalSizeType;
}
