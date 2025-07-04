import React, { ReactNode } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: (s: boolean) => void;
}

const ModalAlert = ({ children, onClose, isVisible }: ModalProps) => {
  const afterOpenModal = () => {};

  const closeModal = () => {
    onClose(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isVisible}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </Modal>
  );
};

export default ModalAlert;
