import { useNavigate } from "react-router";

import { Button, OptionList } from "../../..";

import TicketBGImage from "../../../../images/icons/ticket-bg.svg";
import WalletImage from "../../../../images/icons/empty-wallet-remove.svg";
import ReceiptImage from "../../../../images/icons/receipt-item.svg";
import StripeImage from "../../../../images/payments/stripe.svg";
import VisaImage from "../../../../images/payments/visa.svg";
import SkrillImage from "../../../../images/payments/skrill.svg";
import AmericanExpressImage from "../../../../images/payments/american-express.svg";
import MasterCardImage from "../../../../images/payments/master-card.svg";
import DiscoverImage from "../../../../images/payments/discover.svg";
import UnionPayImage from "../../../../images/payments/union-pay.svg";
import PayPalImage from "../../../../images/payments/pay-pal.svg";

import { DEFAULT_ORDER_DATA, ERoutes } from "../../../../constants";

import styles from "../index.module.css";

const OrderSection = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.orderWrapper}>
      <div className={styles.contentBox}>
        <Button onClick={() => navigate(ERoutes.START)}>Get it now</Button>
        <p className={styles.terms}>
          By counting you agree that if you don’t cancel at least 24 hours prior
          to the end of the 7 days introductory period, you will automatically
          be charged full price $19.99 every month until you cancel in settings.
          Lear more about cancelling and refund policy in{" "}
          <a href="https://english-improve.com/subscription-terms">
            Subscription Terms
          </a>
          .
        </p>
      </div>
      <div className={styles.divider} />
      <div className={styles.contentBox}>
        <h3 className={styles.orderTitle}>What happens after I order?</h3>
        <OptionList data={DEFAULT_ORDER_DATA} />
        <div className={styles.ticketWrapper}>
          <img src={TicketBGImage} alt="" className={styles.ticketBG} />
          <div className={styles.verticalDivider} />
          <div className={styles.indexBox}>
            <div className={styles.ticketBox}>
              <div className={styles.ticketItem}>
                <img src={ReceiptImage} alt="" />
                <p>Safe checkout</p>
              </div>
              <div className={styles.ticketItem}>
                <img src={WalletImage} alt="" />
                <p>No hidden fees</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className={styles.guaranteeTitle}>Guaranteed Safe Checkout</h3>
        <div className={styles.paymentsWrapper}>
          <img src={StripeImage} alt="" />
          <img src={VisaImage} alt="" />
          <img src={SkrillImage} alt="" />
          <img src={AmericanExpressImage} alt="" />
        </div>
        <div className={styles.paymentsWrapper}>
          <img src={MasterCardImage} alt="" />
          <img src={DiscoverImage} alt="" />
          <img src={UnionPayImage} alt="" />
          <img src={PayPalImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default OrderSection;
