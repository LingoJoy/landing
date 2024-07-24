import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  GuaranteePremiumSection,
  Header,
  OrderSection,
  PriceSection,
  UsersPremiumSection,
} from "../..";

import ClockImage from "../../../images/main/clock.png";

import { ERoutes } from "../../../constants";

import styles from "./index.module.css";

const PremiumHero = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(300);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header
        children={
          <div className={styles.headerContent}>
            <p className={styles.headerTitle}>The offer is valid for:</p>
            <div className={styles.headerTimeBox}>
              <img src={ClockImage} alt="" />
              <p className={styles.headerTime}>
                {`${Math.floor(time / 60)}`.padStart(2, "0")}:
                {`${time % 60}`.padStart(2, "0")}
              </p>
            </div>
          </div>
        }
        onClick={() => navigate(ERoutes.START)}
      />
      <div className={styles.contentWrapper}>
        <PriceSection />
        <OrderSection />
        <UsersPremiumSection />
        <GuaranteePremiumSection />
      </div>
    </div>
  );
};

export default PremiumHero;
