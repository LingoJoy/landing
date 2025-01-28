import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import OptionList from "@/components/molecules/OptionList";

import WalletImage from "@/assets/icons/empty-wallet-remove.svg";
import ReceiptImage from "@/assets/icons/receipt-item.svg";
import TicketBGImage from "@/assets/icons/ticket-bg.svg";
import TicketBGWebImage from "@/assets/icons/ticket-web-bg.svg";
import AmericanExpressImage from "@/assets/payments/american-express.svg";
import DiscoverImage from "@/assets/payments/discover.svg";
import MasterCardImage from "@/assets/payments/master-card.svg";
import PayPalImage from "@/assets/payments/pay-pal.svg";
import UnionPayImage from "@/assets/payments/union-pay.svg";
import VisaImage from "@/assets/payments/visa.svg";

import {
  DEFAULT_ORDER_DATA,
  ELocalizationQuestionnaire,
  ERoutes,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const OrderSection = () => {
  const navigate = useNavigate();

  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.orderWrapper}>
      <Box className={styles.contentBox}>
        <Button sx={{ width: "100%" }} onClick={() => navigate(ERoutes.PAY)}>
          {localization[ELocalizationQuestionnaire.LANDING_HEADER_BTN]}
        </Button>
        <p className={styles.terms}>
          {localization[ELocalizationQuestionnaire.PREMIUM_ORDER_TERMS]}{" "}
          <a href="https://english-improve.com/subscription-terms">
            {localization[ELocalizationQuestionnaire.PREMIUM_ORDER_LINK]}
          </a>
          .
        </p>
      </Box>
      <Box className={styles.contentBox}>
        <Box className={styles.divider} />
        <h3 className={styles.orderTitle}>
          {localization[ELocalizationQuestionnaire.PREMIUM_ORDER_AFTER]}
        </h3>
        <Box className={styles.optionList}>
          <OptionList data={DEFAULT_ORDER_DATA} />
        </Box>
        <Box className={styles.ticketWrapper}>
          <Box className={styles.ticketBg}>
            <TicketBGImage />
          </Box>
          <Box className={styles.ticketWebBg}>
            <TicketBGWebImage />
          </Box>
          <Box className={styles.verticalDivider} />
          <Box className={styles.indexBox}>
            <Box className={styles.ticketBox}>
              <Box className={styles.ticketItem}>
                <ReceiptImage />
                <p>
                  {
                    localization[
                      ELocalizationQuestionnaire.PREMIUM_ORDER_TICKET_SAFE
                    ]
                  }
                </p>
              </Box>
              <Box className={styles.ticketItem}>
                <WalletImage />
                <p>
                  {
                    localization[
                      ELocalizationQuestionnaire.PREMIUM_ORDER_TICKET_FEES
                    ]
                  }
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
        <h3 className={styles.guaranteeTitle}>
          {localization[ELocalizationQuestionnaire.PREMIUM_ORDER_GUARANTEE]}
        </h3>
        <Box className={styles.paymentsWrapper}>
          <VisaImage />
          <AmericanExpressImage />
          <MasterCardImage />
          <DiscoverImage />
          <UnionPayImage />
          <PayPalImage />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSection;
