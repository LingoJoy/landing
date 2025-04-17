import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import PulseButton from "@/components/atoms/PulseButton";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

interface IChartOptionProps {
  color: string;
  content: ReactNode;
  position?: "left" | "right";
}

const ChartOption: FC<IChartOptionProps> = ({
  color,
  content,
  position = "right",
}) => {
  return (
    <Box className={styles.chartPoint} sx={{ borderColor: color }}>
      <Box
        className={`${styles.chartPointBox} ${
          position === "right"
            ? styles.chartPointBoxRight
            : styles.chartPointBoxLeft
        }`}
      >
        {content}
        <Box
          className={
            position === "right"
              ? styles.chartPointArrowRight
              : styles.chartPointArrow
          }
        />
      </Box>
    </Box>
  );
};

const ChartSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.chartWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.titleWrapper}>
          <h2 className={styles.chartTitle}>
            {localization[ELocalizationQuestionnaire.NEW_LANDING_CHART_TITLE]}
          </h2>
          <p className={styles.chartSubtitle}>
            {
              localization[
                ELocalizationQuestionnaire.NEW_LANDING_CHART_SUBTITLE
              ]
            }
          </p>
          <p className={styles.chartDescription}>
            {localization[ELocalizationQuestionnaire.NEW_LANDING_CHART_DESCR]}
          </p>
        </Box>
        <Box className={styles.chartBox}>
          <p className={styles.chartEfficiency}>
            {
              localization[
                ELocalizationQuestionnaire.NEW_LANDING_CHART_EFFICIENCY
              ]
            }
          </p>
          <p className={styles.chartNow}>
            {localization[ELocalizationQuestionnaire.NEW_LANDING_CHART_NOW]}
          </p>
          <p className={styles.chartDay}>
            {localization[ELocalizationQuestionnaire.NEW_LANDING_CHART_DAYS]}
          </p>
          <Box className={styles.chartPointBeginner}>
            <ChartOption
              color="#A2B3CB"
              content={
                localization[
                  ELocalizationQuestionnaire.NEW_LANDING_CHART_BEGINNER
                ]
              }
              position="left"
            />
          </Box>
          <Box className={styles.chartPointRegular}>
            <ChartOption
              color="#DD7615"
              content={
                localization[
                  ELocalizationQuestionnaire.NEW_LANDING_CHART_REGULAR
                ]
              }
            />
          </Box>
          <Box className={styles.chartPointUser}>
            <ChartOption
              color="#1D8635"
              content={
                <Box className={styles.chartPointUserBox}>
                  <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}rocket.png`} alt="" />
                  {
                    localization[
                      ELocalizationQuestionnaire.NEW_LANDING_CHART_USER
                    ]
                  }
                </Box>
              }
            />
          </Box>
          <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}improve-chart.png`} alt="" className={styles.chart} />
        </Box>
        <PulseButton
          onClick={() => {
            window.location.href = "#discount-plan";
          }}
          className={styles.chartButton}
        >
          {localization[ELocalizationQuestionnaire.NEW_LANDING_CHART_ACTIVE]}
        </PulseButton>
      </Box>
    </Box>
  );
};

export default ChartSection;
