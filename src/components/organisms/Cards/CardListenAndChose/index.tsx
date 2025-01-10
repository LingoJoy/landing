import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Stack, useMediaQuery } from "@mui/material";

import Waveform from "@/components/molecules/Waveform";
import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

import GirlStudies from "@/assets/girl-listens.png";

import { ELocalization } from "@/constants";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";
import { updateExercise } from "@/store/ActiveLesson";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface CardListenAndChoseProps {
  exercise: Exercise;
  isMistake?: boolean;
}

const CardListenAndChose: React.FC<CardListenAndChoseProps> = ({
  exercise,
  isMistake,
}) => {
  const stateActive =
    exercise.completed &&
    !isMistake &&
    exercise.chooses &&
    exercise.correctAnswerIndex !== undefined
      ? exercise.chooses[exercise.correctAnswerIndex]
      : "";

  const [option, setOption] = useState<string | null>(stateActive);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const isNotMobile = useMediaQuery("(min-width:600px)");

  const localization = useSelector(getLocalization);
  const dispatch = useDispatch();

  const handleCheck = async () => {
    if (
      exercise.chooses &&
      exercise.correctAnswerIndex !== undefined &&
      option !== null &&
      exercise.chooses[exercise.correctAnswerIndex] === option
    ) {
      setIsCorrect(true);
      dispatch(updateExercise({ ...exercise, completed: true }));
      updatePostProgress(exercise.lesson, exercise._id, "completed");
    } else {
      setIsCorrect(false);
    }
  };

  const handleActive = (variant: string) => {
    if (exercise.completed && !isMistake) return;
    setOption(variant);
  };

  return (
    <CardContentWrapper
      cardSx={{
        borderRadius: isNotMobile ? "30px" : "0px",
      }}
      contentSx={{ p: isNotMobile ? "32px" : 1 }}
    >
      <Box className={styles.cardBox}>
        <img alt="" src={GirlStudies} className={styles.cardImage} />
        <Box className={styles.cardAudioBox}>
          <Waveform url={exercise.audioURL || ""} />
        </Box>
      </Box>
      <Stack mt={5} spacing={2} sx={{ textAlign: "center" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.task}
          mt={3}
          mb={3}
        >
          {localization[ELocalization.CHOOSE_PHRASE_ON_AUDIO]}
        </Typography>

        {exercise?.chooses?.map((el, i) => (
          <Button
            sx={{ width: "100%" }}
            variant="empty"
            key={`Option-${i}`}
            className={`${styles.option} ${
              option === el ? styles.activeOption : ""
            } ${
              option === el && (isCorrect || exercise.completed)
                ? styles.correctOption
                : ""
            }`}
            onClick={() => handleActive(el)}
          >
            <Typography
              sx={{
                fontSize: "1rem",
                lineHeight: "1.25rem",
                textTransform: "initial",
              }}
            >
              {el}
            </Typography>
          </Button>
        ))}
      </Stack>
      <NavigationButtons
        exercise={exercise}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        onNext={handleCheck}
        isMistake={isMistake}
      />
    </CardContentWrapper>
  );
};

export default CardListenAndChose;
