import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";

import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

import Flowers from "@/assets/in-flowers.png";
import BoyTalks from "@/assets/boy-talks.png";
import BoyWithPhone from "@/assets/boy-with-phone.png";
import Comment from "@/assets/left-comment-bg.png";

import { getProfile } from "@/store/profile";
import { ELocalization, ETranslate } from "@/constants";
import { setNextExercise } from "@/store/ActiveLesson";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  exercise: Exercise;
}

export const Read: React.FC<IProps> = ({ exercise }) => {
  const localization = useSelector(getLocalization);

  const isNotMobile = useMediaQuery("(min-width:426px)");

  const dispatch = useDispatch();

  const profile = useSelector(getProfile);

  const handleSubmit = async () => {
    dispatch(setNextExercise(""));
    updatePostProgress(exercise.lesson, exercise._id, "completed");
  };

  const getText = (text: string) => {
    if (!text) return "";

    return text.replace(/\*\*(.*?)\*\*/g, function (value: string) {
      const filter = value.replace(/\*/g, "");
      return "<b>" + filter + "</b>";
    });
  };

  const title = getText(exercise.title?.[ETranslate.ENGLISH] || "");
  const text =
    typeof exercise.text === "object" &&
    !Array.isArray(exercise.text) &&
    exercise.text !== null &&
    getText(exercise.text?.[profile?.locale || ETranslate.ENGLISH]);

  return (
    <CardContentWrapper
      cardSx={{
        borderRadius: isNotMobile ? "30px" : "0px",
        height: "750px !important",
        p: 0,
      }}
    >
      <Typography
        variant="subtitle2"
        className={styles.task}
        sx={{ fontSize: "0.75rem", lineHeight: "1.25rem" }}
      >
        {localization[ELocalization.READ]}
      </Typography>
      <Box className={styles.card}>
        <Box className={styles.answerWrapper}>
          <Box>
            <Typography
              className={styles.cardSentence}
              sx={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          </Box>
        </Box>
        <img src={Flowers} alt="" className={styles.cardImage} />
      </Box>
      <Box className={styles.ruleWrapper}>
        <img src={BoyTalks} alt="" className={styles.ruleImageMobile} />
        <img src={BoyWithPhone} alt="" className={styles.ruleImageDesktop} />
        <Box className={styles.ruleBox}>
          <img src={Comment} alt="" className={styles.ruleContentBG} />
          <Box className={styles.ruleContent}>
            <Typography
              className={styles.rule}
              variant="h6"
              sx={{ fontSize: "0.75rem", lineHeight: "1rem" }}
            >
              {exercise.title_theory?.[profile?.locale || ETranslate.ENGLISH]}
            </Typography>
            <Box className={styles.ruleTextBox}>
              <Typography
                className={styles.ruleText}
                sx={{ fontSize: "0.75rem", lineHeight: "1.125rem" }}
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <NavigationButtons
        exercise={exercise}
        isCorrect={null}
        setIsCorrect={() => {}}
        onNext={handleSubmit}
      />
    </CardContentWrapper>
  );
};
