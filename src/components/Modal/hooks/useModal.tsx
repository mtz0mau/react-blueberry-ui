import { useModalStore } from "components/Modal/stores/Modal.store";
import { IModal } from "components/Modal/interfaces/IModal";

export const useModal = () => {
  const modals = useModalStore((state) => state.modals);
  const setModals = useModalStore((state) => state.setModals);

  const open = (modal: IModal) => {
    setModals([...modals, modal]);
  };

  const close = () => {
    setModals(modals.slice(0, -1));
  };

  return { open, close };
};
