import { Box } from "@mui/material";
import { FC, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import LogoIcon from "@/components/atoms/icons/LogoIcon";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import ContentContainer from "@/components/organisms/ContentContainer";

import LevelImage from "@/assets/fact-chart.png";
import AttentionImage from "@/assets/main/attention.png";

import { ELocalizationQuestionnaire } from "@/constants";
import { ERoutes } from "@/constants/pages";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import { logEvent } from "@/utils/amplitude";
import styles from "./index.module.scss";

interface IChartOptionProps {
  color: string;
  content: ReactNode;
  position?: "left" | "right";
}

const ChartOption: FC<IChartOptionProps> = ({ color, content }) => {
  return (
    <Box className={styles.chartPoint} sx={{ borderColor: color }}>
      <Box className={`${styles.chartPointBox}`} style={{ background: color }}>
        {content}
        <Box style={{ background: color }} className={styles.chartPointArrow} />
      </Box>
    </Box>
  );
};

const FactHero = () => {
  
  const localization = useSelector(getLocalizationQuestionnaire);

  useEffect(() => {
    logEvent(`web_showed_fact_page`);
  }, [])

  const navigate = useNavigate();

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoWrapper}>
        <LogoIcon width="100px" height="30" />
      </Box>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box className={styles.titleWrapper}>
            <h2>{localization[ELocalizationQuestionnaire.FACT_TITLE]}</h2>
            <img src={AttentionImage} alt="" />
          </Box>
          <p>
            {localization[ELocalizationQuestionnaire.FACT_DESCR_1]}{" "}
            <span>{localization[ELocalizationQuestionnaire.FACT_LINK]}</span>
          </p>
          <p>{localization[ELocalizationQuestionnaire.FACT_DESCR_2]}</p>
          <Box className={styles.chartWrapper}>
            <img src={LevelImage} alt="" />
            <Box className={styles.chartPointNow}>
              <ChartOption
                color="#FF575A"
                content={
                  localization[ELocalizationQuestionnaire.QUEST_KNOW_YOU]
                }
              />
            </Box>
            <Box className={styles.chartPointUser}>
              <ChartOption
                color="#0AC038"
                content={
                  localization[
                    ELocalizationQuestionnaire.NEW_LANDING_CHART_USER
                  ]
                }
              />
            </Box>
            <Box className={styles.chartPointRegular}>
              <ChartOption
                color="#FFA960"
                content={
                  localization[ELocalizationQuestionnaire.QUEST_KNOW_AVERAGE]
                }
              />
            </Box>
            <Box className={styles.chartTimeWrapper}>
              <span>
                {localization[ELocalizationQuestionnaire.QUEST_KNOW_TODAY]}
              </span>
              <span>
                {localization[ELocalizationQuestionnaire.IN]} 28{" "}
                {localization[ELocalizationQuestionnaire.DAYS]}
              </span>
            </Box>
          </Box>
        </Box>
      </ContentContainer>
      <SelectorFooter
        onClick={() => navigate(ERoutes.PREMIUM)}
        btnText={localization[ELocalizationQuestionnaire.GO_IT]}
      />
    </Box>
  );
};

export default FactHero;
