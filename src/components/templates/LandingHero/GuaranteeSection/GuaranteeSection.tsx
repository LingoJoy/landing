import { Link } from "react-router-dom";

import { PaperBG } from "../../..";

import CardImage from "../../../../images/main/card.png";

import styles from "../index.module.css";

const GuaranteeSection = () => {
  return (
    <div className={styles.contentBox}>
      <div className={styles.guaranteeWrapper}>
        <div className={styles.guaranteeBG}>
          <PaperBG />
        </div>
        <div className={styles.indexBox}>
          <div className={styles.titleWrapper}>
            <img src={CardImage} alt="" />
            <h2 className={styles.title}>Money-Back Guarantee</h2>
          </div>
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

export default GuaranteeSection;
