import { Box } from "@mui/material";
import { useSelector } from "react-redux";

import WordsComment from "@/components/molecules/WordsComment";
import HeaderQuestionnaire from "@/components/organisms/HeaderQuestionnaire";
import GuaranteeSection from "./GuaranteeSection";
import LessonsSection from "./LessonsSection";
import PlanSection from "./PlanSection";
import UsersSection from "./UsersSection";
import WhatYouGetSection from "./WhatYouGetSection";
import YourPlanSection from "./YourPlanSection";

import { DEFAULT_LEVEL_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire } from "@/store/questionnaire";
import { getLevel } from "@/utils/getLevel";
import { randomIntFromInterval } from "@/utils/randomIntFromInterval";

import { logEvent } from "@/utils/amplitude";
import { useEffect } from "react";
import styles from "./index.module.scss";

const LandingHero = () => {
  const { vocabulary } = useSelector(getQuestionnaire);

  const localization = useSelector(getLocalizationQuestionnaire);

  const words =
    vocabulary.a.length +
    vocabulary.b1.length * 2 +
    vocabulary.b2.length * 3 +
    randomIntFromInterval(1, 70);

  const level = getLevel(words);

  useEffect(() => {
    logEvent(`web_showed_landing_page`);
  }, []);

  return (
    <Box className={styles.wrapper}>
      <HeaderQuestionnaire
        children={
          <Box className={styles.headerContent}>
            <p className={styles.headerTitle}>
              {localization[ELocalizationQuestionnaire.LANDING_HEADER]}
            </p>
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}star.png`} alt="" />
          </Box>
        }
        onClick={() => {
          window.location.href = "#plan";
        }}
      />
      <Box className={styles.contentWrapper}>
        <Box className={styles.contentBox}>
          <Box className={styles.titleWrapper}>
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}rocket.png`} alt="" />
            <h2 className={`${styles.title} ${styles.resultTitle}`}>
              {localization[ELocalizationQuestionnaire.LANDING_RESULT_TITLE]}
            </h2>
            <p className={styles.description}>
              {level.active}{" "}
              {localization[ELocalizationQuestionnaire.LANDING_WORDS]}
            </p>
          </Box>
          <Box className={styles.levelTable}>
            <Box className={styles.levelHeader}>
              <p>
                {localization[ELocalizationQuestionnaire.LANDING_TABLE_LEVEL]}
              </p>
              <p>
                {localization[ELocalizationQuestionnaire.LANDING_TABLE_ACTIVE]}
              </p>
              <p>
                {localization[ELocalizationQuestionnaire.LANDING_TABLE_PASSIVE]}
              </p>
            </Box>
            <Box className={styles.levelBody}>
              {DEFAULT_LEVEL_DATA.map((el) => (
                <Box
                  key={el.id}
                  className={
                    level.active > el.active && level.active < el.passive
                      ? styles.activeLevel
                      : styles.level
                  }
                >
                  <p>{el.title}</p>
                  <p>{el.active}</p>
                  <p>{el.passive}</p>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className={styles.contentBox}>
          <Box className={styles.titleWrapper}>
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}prize.png`} alt="" />
            <h2 className={`${styles.title} ${styles.chartTitle}`}>
              {localization[ELocalizationQuestionnaire.LANDING_CHART_TITLE]}
            </h2>
          </Box>
        </Box>
        <Box className={styles.growWrapper}>
          <Box className={styles.nowWrapper}>
            <WordsComment title={level.title} words={level.active} />
          </Box>
          <Box className={styles.maxWrapper}>
            <WordsComment
              title={"Proficiency (C1)"}
              words={10000}
              type="plan"
            />
          </Box>
          <Box className={styles.nowBox}>
            <Box className={styles.arrow} />
            {localization[ELocalizationQuestionnaire.LANDING_CHART_NOW]}
          </Box>
          <Box className={styles.planBox}>
            <Box className={styles.arrow} />
            {localization[ELocalizationQuestionnaire.LANDING_CHART_PLAN]}
          </Box>
          <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}grow.png`} alt="" className={styles.chart} />
        </Box>
        <PlanSection />
        <LessonsSection />
        <WhatYouGetSection />
        <UsersSection />
        <GuaranteeSection />
        <YourPlanSection />
      </Box>
    </Box>
  );
};

export default LandingHero;
