import { Box } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

import Modal from "@/components/atoms/Modal";

import HandshakeImage from "@/assets/icons/handshake.svg";
import PayPal from "@/assets/PayPal.svg";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  price?: number;
  discount?: number;
}

// const getPercentage = (price: number, discount: number) => {
//   return Number((discount / price).toFixed(2)) * 100;
// };

const PayModal: FC<IProps> = ({ isOpen, onClose }) => {
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
          {/* <Box className={styles.headerWrapper}>
            <Logo />
            <Box className={styles.headerBox}>
              <h4>{localization[ELocalizationQuestionnaire.PAY_TITLE]}</h4>
              <p>{`${title} ${
                localization[ELocalizationQuestionnaire.PAY_DESCR]
              }`}</p>
            </Box>
          </Box>
          <Box className={styles.priceWrapper}>
            <Box className={styles.priceBox}>
              <p>{localization[ELocalizationQuestionnaire.PAY_PRICE]}</p>
              <span>{`$${price}`}</span>
            </Box>

            {discount ? (
              <Box className={styles.discountBox}>
                <p>{localization[ELocalizationQuestionnaire.PAY_DISCOUNT]}</p>
                <span>{`- $${(price - discount).toFixed(2)}`}</span>
              </Box>
            ) : null}
            <CustomDivider sx={{ m: "12px 0" }} />
            <Box className={styles.totalBox}>
              <p>{localization[ELocalizationQuestionnaire.PAY_TOTAL]}</p>
              <span>{`$${discount || price}`}</span>
            </Box>
            {discount ? (
              <p className={styles.saving}>{`${
                localization[ELocalizationQuestionnaire.PAY_SAVING]
              } ${getPercentage(price, discount)}%`}</p>
            ) : null}
          </Box> */}
          <Box className={styles.guaranteeWrapper}>
            <HandshakeImage />
            <h3>
              {localization[ELocalizationQuestionnaire.PAY_GUARANTEE_TITLE]}
            </h3>
            <p>
              {localization[ELocalizationQuestionnaire.PAY_GUARANTEE_DESCR]}
            </p>
          </Box>
          <Box className={`checkout-container ${styles.checkout}`} />
          <Box className={styles.serviceWrapper}>
            <PayPal />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PayModal;
