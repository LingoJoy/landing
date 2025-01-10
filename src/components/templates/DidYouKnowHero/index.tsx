import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import ContentContainer from "@/components/organisms/ContentContainer";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import SelectorFooter from "@/components/molecules/SelectorFooter";

import ChartImage from "@/assets/chart.png";
import AttentionImage from "@/assets/main/attention.png";

import { ERoutes } from "@/constants/pages";
import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

const DidYouKnowHero = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const navigate = useNavigate();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.logoWrapper}>
        <LogoIcon width="90px" height="40" />
      </Box>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box>
            <Box className={styles.titleWrapper}>
              <h2 className={styles.title}>
                {localization[ELocalizationQuestionnaire.QUEST_KNOW_TITLE]}
              </h2>
              <img src={AttentionImage} alt="" />
            </Box>
            <p className={styles.description}>
              {localization[ELocalizationQuestionnaire.QUEST_KNOW_TEXT_1]}{" "}
              <a href="/#" className={styles.link}>
                {localization[ELocalizationQuestionnaire.QUEST_KNOW_LINK]}
              </a>
              .
            </p>
            <p className={styles.description}>
              {localization[ELocalizationQuestionnaire.QUEST_KNOW_TEXT_2]}
            </p>
          </Box>
          <Box className={styles.chartBox}>
            <Box className={styles.you}>
              <Box className={styles.arrow} />
              {localization[ELocalizationQuestionnaire.QUEST_KNOW_YOU]}
            </Box>
            <Box className={styles.users}>
              <Box className={styles.arrow} />
              {localization[ELocalizationQuestionnaire.QUEST_KNOW_USERS]}
            </Box>
            <Box className={styles.average}>
              <Box className={styles.arrow} />
              {localization[ELocalizationQuestionnaire.QUEST_KNOW_AVERAGE]}
            </Box>
            <Box className={styles.time}>
              <span>
                {localization[ELocalizationQuestionnaire.QUEST_KNOW_TODAY]}
              </span>
              <span>
                {localization[ELocalizationQuestionnaire.QUEST_KNOW_MONTH]}
              </span>
            </Box>
            <img src={ChartImage} alt="" />
          </Box>
        </Box>
      </ContentContainer>
      <SelectorFooter onClick={() => navigate(ERoutes.PAY)} />
    </Box>
  );
};

export default DidYouKnowHero;
