import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import LogoIcon from "@/components/atoms/icons/LogoIcon";
import PulseButton from "@/components/atoms/PulseButton";

import StartEllipseImage from "@/assets/icons/start-ellipse.svg";

import { ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

const StartHero = () => {
  const localization = useSelector(getLocalizationQuestionnaire);
  const { search } = useLocation();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.ellipse}>
        <StartEllipseImage />
      </Box>

      <Box className={styles.logoWrapper}>
        <LogoIcon />
      </Box>
      <Box className={styles.centerWrapper}>
        <img className={styles.leftCenterImage} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}start-hero.png`} alt="" />
      </Box>
      <Box className={styles.contentWrapper}>
        <h2 className={styles.title}>
          {localization[ELocalizationQuestionnaire.QUEST_START_TITLE]}
        </h2>
        <p className={styles.description}>
          {localization[ELocalizationQuestionnaire.QUEST_START_DESCR]}
        </p>
      </Box>
      <Box className={styles.bottomWrapper}>
        <Link to={{
          pathname: ERoutes.QUESTIONNAIRE_MOTIVATION,
          search,
        }} className={styles.button}>
          <PulseButton onClick={() => logEvent("web_start_questionnaire")}>
            {localization[ELocalizationQuestionnaire.QUEST_START_LETS_START]}
          </PulseButton>
        </Link>
        <Link to={ERoutes.LOGIN}>
          <p className={styles.link}>
            {localization[ELocalizationQuestionnaire.QUEST_START_LOGIN]}
          </p>
        </Link>
        <p className={styles.agreements}>
          {localization[ELocalizationQuestionnaire.QUEST_START_BY_CONTINUE]}{" "}
          <br />
          <Link to={ERoutes.TERMS_AND_CONDITIONS}>
            <span className={styles.agreementsLink}>
              {localization[ELocalizationQuestionnaire.TERMS_OF_SERVICE]}
            </span>
          </Link>
          ,{" "}
          <Link to={ERoutes.PRIVACY_POLICY}>
            <span className={styles.agreementsLink}>
              {localization[ELocalizationQuestionnaire.PRIVACY_POLICY]}
            </span>
          </Link>
          ,{" "}
          <Link to={ERoutes.SUBSCRIPTIONS}>
            <span className={styles.agreementsLink}>
              {localization[ELocalizationQuestionnaire.SUBSCRIPTION_POLICY]}
            </span>
          </Link>{" "}
          {localization[ELocalizationQuestionnaire.AND]}{" "}
          <Link to={ERoutes.MONEY}>
            <span className={styles.agreementsLink}>
              {localization[ELocalizationQuestionnaire.MONEY_BACK_POLICY]}
            </span>
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default StartHero;
