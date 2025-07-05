import React, { ReactNode } from "react";
import Modal from "react-modal";
import { useTheme } from "styled-components";

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: (s: boolean) => void;
}

const ModalAlert = ({ children, onClose, isVisible }: ModalProps) => {
  const theme = useTheme();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: 10,
      minHeight: 200,
      background: theme.background,
    },
  };
  const closeModal = () => {
    onClose(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isVisible}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </Modal>
  );
};

export default ModalAlert;
