import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Check from "@/components/atoms/Check";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import ContentContainer from "@/components/organisms/ContentContainer";

import { ELocalizationQuestionnaire } from "@/constants";
import { ERoutes } from "@/constants/pages";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire } from "@/store/questionnaire";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { logEvent } from "../../../utils/amplitude";
import styles from "./index.module.scss";

const PlanHero = () => {
  const { personal } = useSelector(getQuestionnaire);
  const localization = useSelector(getLocalizationQuestionnaire);
  const [searchParams] = useSearchParams();

  const newPremium = searchParams.get("new-premium");
  const newestLanding = searchParams.get("newest-landing");

  useEffect(() => {
    logEvent(`web_showed_plan_page`);
  }, [])

  const navigate = useNavigate();
  const pathname = useMemo(() => {
    if (typeof newPremium === 'string') {
      return ERoutes.NEW_PREMIUM;
    }
    if (typeof newestLanding === 'string') {
      return ERoutes.NEWEST_LANDING;
    }

      return ERoutes.NEW_LANDING;
  }, [newPremium, newestLanding]);

  return (
    <Box className={styles.wrapper}>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box className={styles.titleWrapper}>
            <Check isActive={true} size="25px" activeColor="#0AC038" />
            <h2>
              <span>{personal.name || "User"}</span>,{" "}
              {localization[ELocalizationQuestionnaire.PLAN_TITLE]}
            </h2>
            <p>{localization[ELocalizationQuestionnaire.PLAN_DESCR]}</p>
          </Box>
          <Box className={styles.chartWrapper}>
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}level-grow.png`} alt="" />
            <p className={styles.chartTitle}>
              {localization[ELocalizationQuestionnaire.PLAN_CHART_TITLE]}
            </p>
            <Box className={styles.chartPoint}>
              <Box
                className={`${styles.chartPointBox} ${styles.chartPointBoxRight}`}
              >
                <Box className={styles.chartPointContent}>
                  <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}prize.png`} />
                  <p>
                    {localization[ELocalizationQuestionnaire.IN]} 28{" "}
                    {localization[ELocalizationQuestionnaire.DAYS]}
                  </p>
                </Box>
                <Box className={styles.chartPointArrowRight} />
              </Box>
            </Box>
            <Box className={styles.chartTimeWrapper}>
              <span>
                {localization[ELocalizationQuestionnaire.NEW_LANDING_CHART_NOW]}
              </span>
              <span>7 {localization[ELocalizationQuestionnaire.DAYS]}</span>
              <span>14 {localization[ELocalizationQuestionnaire.DAYS]}</span>
              <span>21 {localization[ELocalizationQuestionnaire.DAYS]}</span>
              <span>28 {localization[ELocalizationQuestionnaire.DAYS]}</span>
            </Box>
          </Box>
        </Box>
      </ContentContainer>
      <SelectorFooter onClick={() => navigate({
        pathname,
      })} />
    </Box>
  );
};

export default PlanHero;
