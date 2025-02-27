import { Box } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

import Modal from "@/components/atoms/Modal";


import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import LogoIcon from "../../../atoms/icons/LogoIcon";
import styles from "./index.module.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  price?: number | string;
  discount?: number | string;
  period?: string;
}

const PayModal: FC<IProps> = ({ isOpen, onClose, title, price, period }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      button={<></>}
      cardClass={styles.card}
      closeClass={styles.close}
    >
      <Box className={styles.webWrapper}>
        <Box className={styles.contentWrapper}>
          <Box className={styles.headerWrapper}>
            <LogoIcon />
            <Box className={styles.headerBox}>
              {title ? (
                <h4>{`${title}`}</h4>
              ) :
                <h4>{`${localization[ELocalizationQuestionnaire.UNLIMITED_ACCESS]}`}
                </h4>
              }
            </Box>
          </Box>
          {period ? (
            <Box className={styles.priceCenterWrapper}>
              <Box className={styles.priceBox}>
                <span>{`${period} / ${price}`}</span>
              </Box>
            </Box>
          ) :
            <Box className={styles.priceWrapper}>
              <Box className={styles.priceBox}>
                <span>{`${price}`}</span>
              </Box>
            </Box>
          }
          <Box className={`checkout-container ${styles.checkout}`} />
        </Box>
      </Box>
    </Modal>
  );
};

export default PayModal;
