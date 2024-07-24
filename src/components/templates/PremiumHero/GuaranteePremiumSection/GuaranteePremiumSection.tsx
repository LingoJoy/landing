import { Link } from "react-router-dom";

import { PaperBG } from "../../..";

import ShieldImage from "../../../../images/shield-dynamic-color.png";

import styles from "../index.module.css";

const GuaranteePremiumSection = () => {
  return (
    <div className={styles.contentBox}>
      <div className={styles.guaranteeWrapper}>
        <div className={styles.guaranteeBG}>
          <PaperBG height="400px" />
        </div>
        <div className={styles.indexBox}>
          <img src={ShieldImage} alt="" className={styles.guaranteeIcon} />
          <h2 className={styles.guaranteeName}>Money-Back Guarantee</h2>
          <div className={styles.guaranteeBox}>
            <p className={styles.guarantee}>
              We know for sure following this plan will bring you awesome
              results in 14 days. After all of our positive customer reviews,{" "}
              <Link to={""}>
                <span className={styles.link}>
                  we are ready to return your money
                </span>
              </Link>{" "}
              if your growth in English is not what you expected. But we know it
              will!
            </p>
            <p className={styles.guarantee}>
              Find more about applicable limitations in our money-back policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteePremiumSection;
