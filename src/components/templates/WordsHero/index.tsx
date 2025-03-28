import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import SelectorFooter from "@/components/molecules/SelectorFooter";
import ContentContainer from "@/components/organisms/ContentContainer";

import { DEFAULT_LEVEL_DATA, ELocalizationQuestionnaire } from "@/constants";
import { ERoutes } from "@/constants/pages";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire } from "@/store/questionnaire";
import { getLevel } from "@/utils/getLevel";
import { randomIntFromInterval } from "@/utils/randomIntFromInterval";

import { logEvent } from "@/utils/amplitude";
import { useEffect } from "react";
import styles from "./index.module.scss";

const DEFAULT_COLORS = [
  {
    title: "Beginner",
    color: "#FF3F01",
  },
  {
    title: "Elementary",
    color: "#ECC200",
  },
  {
    title: "Intermediate",
    color: "#0AC038",
  },
  {
    title: "Upper-Intermediate",
    color: "#00ACE4",
  },
  {
    title: "Advanced",
    color: "#432DFF",
  },
];

const getPosition = (level: number) => {
  switch (level) {
    case 1:
      return "25%";
    case 2:
      return "46%";
    case 3:
      return "67%";
    case 4:
      return "88%";
    default:
      return "5%";
  }
};

const WordsHero = () => {
  const { vocabulary } = useSelector(getQuestionnaire);
  const { search } = useLocation();

  const localization = useSelector(getLocalizationQuestionnaire);

  const words =
    vocabulary.a.length +
    vocabulary.b1.length * 2 +
    vocabulary.b2.length * 3 +
    randomIntFromInterval(1, 10);

  const level = getLevel(words);

  const dataLevel =
    DEFAULT_LEVEL_DATA.find((el) => el.title === level.title) ||
    DEFAULT_LEVEL_DATA[0];

  const dataColor =
    DEFAULT_COLORS.find((it) => it?.title === dataLevel?.title)?.color ||
    DEFAULT_COLORS[0].color;

  const dataNextLevel = DEFAULT_COLORS[dataLevel.id + 1];

  const navigate = useNavigate();

  useEffect(()=> {
    logEvent(`web_showed_words_page`);
  }, [])

  return (
    <Box className={styles.wrapper}>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box className={styles.wordTitleWrapper}>
            <Box className={styles.wordTopTitle}>
              {localization[ELocalizationQuestionnaire.WORDS_TITLE]}
            </Box>
            <Box className={styles.wordTitle}>
              {(
                Math.round(
                  ((dataLevel.active + dataLevel.passive) / 2) +
                  (Math.random() * 40 - 20)
                )
              )}{" "}
              {localization[ELocalizationQuestionnaire.LANDING_WORDS]}
            </Box>
          </Box>
          <Box className={styles.levelLineWrapper}>
            <Box className={styles.levelLine}>
              <Box
                className={styles.levelLinePoint}
                style={{
                  background: dataColor,
                  left: getPosition(dataLevel.id),
                }}
              />
            </Box>
            <Box className={styles.levelLineBox}>
              {DEFAULT_LEVEL_DATA.map((el, i) => (
                <Box className={styles.levelLineInfoBox} key={i}>
                  <h3
                    style={{
                      color: dataColor,
                    }}
                  >
                    {el.title}
                  </h3>
                  <p>
                    {el.active}-{el.passive}
                  </p>
                </Box>
              ))}
            </Box>
            <Box className={styles.levelInfoBox}>
              <h4>
                {localization[ELocalizationQuestionnaire.WORDS_LEVEL_TITLE]}:
                <span
                  style={{
                    color: dataColor,
                  }}
                >
                  {dataLevel.title}
                </span>
              </h4>
              <p>
                {localization[ELocalizationQuestionnaire.WORDS_LEVEL_DESCR]}
              </p>
              {dataNextLevel ? (
                <Box className={styles.levelInfoGoalBox}>
                  <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}status-up.svg`} alt="" />
                  <p>
                    {localization[ELocalizationQuestionnaire.WORDS_NEXT_LEVEL]}:{" "}
                    <span
                      style={{
                        color: dataNextLevel.color,
                      }}
                    >
                      {dataNextLevel.title}
                    </span>
                  </p>
                </Box>
              ) : null}
              <Box className={styles.levelInfoGoalBox}>
                <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}flag.svg`} alt="" />
                <p>
                  {localization[ELocalizationQuestionnaire.WORDS_GOAL_TITLE]}:{" "}
                  <span>
                    {localization[ELocalizationQuestionnaire.WORDS_GOAL]}
                    <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}open-book.png`} alt="" />
                  </span>
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      </ContentContainer>
      <SelectorFooter onClick={() => navigate({
        pathname: ERoutes.PLAN,
        search,
      })} />
    </Box>
  );
};

export default WordsHero;
