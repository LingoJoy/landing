import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import HeaderQuestionnaire from "@/components/organisms/HeaderQuestionnaire";
import GuaranteePremiumSection from "./GuaranteePremiumSection";
import PriceSection from "./PriceSection";
import UsersPremiumSection from "./UsersPremiumSection";

import ClockImage from "@/assets/main/clock.png";

import { ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

const PremiumHero = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(300);

  const localization = useSelector(getLocalizationQuestionnaire);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <Box className={styles.wrapper}>
      <HeaderQuestionnaire
        children={
          <Box className={styles.headerContent}>
            <p className={styles.headerTitle}>
              {localization[ELocalizationQuestionnaire.PREMIUM_HEADER]}
            </p>
            <Box className={styles.headerTimeBox}>
              <img src={ClockImage} alt="" />
              <p className={styles.headerTime}>
                {`${Math.floor(time / 60)}`.padStart(2, "0")}:
                {`${time % 60}`.padStart(2, "0")}
              </p>
            </Box>
          </Box>
        }
        onClick={() => navigate(ERoutes.PAY)}
      />
      <Box className={styles.contentWrapper}>
        <PriceSection onNext={() => navigate(ERoutes.PAY)} />
        {/* <OrderSection /> */}
        <UsersPremiumSection />
        <GuaranteePremiumSection />
      </Box>
    </Box>
  );
};

export default PremiumHero;
