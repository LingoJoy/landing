import CupImage from "../../../../images/icons/cup.svg";
import FireImage from "../../../../images/main/fire.png";

import styles from "../index.module.css";

const PriceSection = () => {
  return (
    <div className={styles.contentBox}>
      <div className={styles.priceWrapper}>
        <div className={styles.chipWrapper}>
          <img src={CupImage} alt="" />
          <p>Premium Access</p>
        </div>
        <h2 className={styles.priceTitle}>
          Last Chance to Get a Discount on Premium Access!
        </h2>
        <div className={styles.priceBox}>
          <div className={styles.oldPriceBox}>
            <p className={styles.oldPriceTitle}>Old Price</p>
            <p className={styles.oldPrice}>$39.99/ month</p>
          </div>
          <div className={styles.newPriceBox}>
            <div className={styles.newPriceTitleBox}>
              <p>New Price</p>
              <img src={FireImage} alt="" />
              <img src={FireImage} alt="" />
            </div>
            <p className={styles.newPrice}>$19.99/month</p>
            <p>7-day trial for $1</p>
          </div>
          <div className={styles.discountBox}>
            <p>50% OFF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
