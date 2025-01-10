import React, { ReactNode, useEffect, useRef } from "react";

import { Box } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import CardWrapper from "@/components/organisms/CardWrapper";

import Close from "@/assets/close.svg";

import styles from "./index.module.scss";

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  childrenContent?: ReactNode;
  button: ReactNode;
  cardClass?: string;
  paperClass?: string;
  headerClass?: string;
  contentClass?: string;
  bottomPaper?: string;
  customBackgroundClass?: string;
  closeClass?: string;
  zIndex?: string;
}

const Modal: React.FC<IProps> = ({
  isOpen,
  onClose,
  children,
  childrenContent,
  button,
  cardClass,
  paperClass,
  headerClass,
  contentClass,
  bottomPaper,
  customBackgroundClass,
  closeClass,
  zIndex,
}) => {
  const modalContainerRef = useRef(null);

  const handleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (modalContainerRef.current === e.target) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => { document.body.style.overflow = "unset" };
  }, [isOpen]);

  return (
    <Box
      className={`${styles.background} ${isOpen ? styles.open : ""
        } ${customBackgroundClass}`}
      onClick={handleModal}
      ref={modalContainerRef}
      zIndex={zIndex}
      data-class="CustomModal"
    >
      <CardWrapper className={`${styles.card} ${cardClass}`}>
        <Box className={`${styles.bottomPaper} ${bottomPaper}`} />
        <Box className={`${styles.paper} ${paperClass}`}>
          <Box className={headerClass}>
            {onClose && (
              <Box
                className={`${styles.close} ${closeClass}`}
                onClick={onClose}
              >
                <Close />
              </Box>
            )}
            {children}
          </Box>
          {childrenContent ? (<Box>
            {childrenContent}
          </Box>) : null}
          <ContentWrapper contentClass={contentClass}>
            <Box className={styles.button}>{button}</Box>
          </ContentWrapper>
        </Box>
      </CardWrapper>
    </Box>
  );
};

export default Modal;
