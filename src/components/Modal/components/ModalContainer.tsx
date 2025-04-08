import { Modal } from "antd";
import { useModalStore } from "components/Modal/stores/Modal.store";
import { ModalSizeTypeValues } from "components/Modal/types/ModalSizeType";
import { IModal } from "components/Modal/interfaces/IModal";

export const ModalContainer = () => {
  const modals = useModalStore((state) => state.modals);
  const setModals = useModalStore((state) => state.setModals);

  return (
    <>
      {modals.map((modal: IModal, i) => (
        <Modal
          key={i}
          title={modal.title}
          open
          onCancel={() => {
            setModals(modals.slice(0, -1));
          }}
          footer={null}
          destroyOnClose={true}
          closeIcon={modal.hideCloseButton ? null : undefined}
          maskClosable={true}
          width={ModalSizeTypeValues[modal.size || 'md']}
          styles={{
            mask: {
              backdropFilter: 'blur(2px)'
            }
          }}
          keyboard={true}
        >
          <div className={'mt-6'}>
            {modal.content}
          </div>
        </Modal>
      ))}
    </>
  );
};
