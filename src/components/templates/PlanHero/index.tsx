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

import { logEvent } from "@/utils/amplitude";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./index.module.scss";

const PlanHero = () => {
  const { personal } = useSelector(getQuestionnaire);
  const localization = useSelector(getLocalizationQuestionnaire);
  const [searchParams] = useSearchParams();

  const newPremium = searchParams.get("new-premium");
  const newestLanding = searchParams.get("newest-landing");
  const newLandingPremium = searchParams.get("new-landing-premium");
  const landingPr = searchParams.get("landing-pr");
  const landingPr2 = searchParams.get("landing-pr2");
  const landingPr3 = searchParams.get("landing-pr3");
  const landingPr4 = searchParams.get("landing-pr4");
  const landingNb = searchParams.get("landing-nb");
  const landingPrOwn = searchParams.get("landing-pr-own");
  const landingBtrm = searchParams.get("landing-btrm");

  useEffect(() => {
    logEvent(`web_showed_plan_page`);
  }, []);

  const navigate = useNavigate();
  const pathname = useMemo(() => {
    if (typeof newPremium === 'string') {
      return ERoutes.NEW_PREMIUM;
    }
    if (typeof newestLanding === 'string') {
      return ERoutes.NEWEST_LANDING;
    }
    if (typeof newLandingPremium === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.NEW_LANDING_PREMIUM; 
    }
    if (typeof landingPr === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.LANDING_PR; 
    }
    if (typeof landingPr2 === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.LANDING_PR2; 
    }

    if (typeof landingPr3 === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.LANDING_PR3; 
    }
    if (typeof landingPr4 === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.LANDING_PR4; 
    }
    if (typeof landingNb === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.LANDING_NB; 
    }
    if (typeof landingPrOwn === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.LANDING_PR_OWN; 
    }
    if (typeof landingBtrm === 'string' && window.location.hostname !== "lingojoy.app" ) {
      return ERoutes.LANDING_BTRM; 
    }

      return ERoutes.NEW_LANDING;
  }, [newPremium, newestLanding, newLandingPremium, landingPr, landingPr2, landingPr3, landingPr4, landingNb, landingPrOwn, landingBtrm]);

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
