import React, { ReactNode, useRef } from "react";

import { Box } from "@mui/material";

import Close from "@/assets/close.svg";

import styles from "./index.module.scss";

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const Sidebar: React.FC<IProps> = ({ isOpen, onClose, children }) => {
  const modalContainerRef = useRef(null);

  const handleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalContainerRef.current === e.target) {
      onClose?.();
    }
  };

  return (
    <Box
      className={`${styles.background} ${isOpen ? styles.open : ""}`}
      onClick={handleModal}
      ref={modalContainerRef}
    >
      <Box className={styles.paper}>
        <Box>
          {onClose && (
            <Box className={styles.close} onClick={onClose}>
              <Close />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
