import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";

import NavigationButtons from "@/components/molecules/NavigationButtons";

import {
  setWrongCompletedExersises,
  updateExercise,
} from "@/store/ActiveLesson";
import { ELocalization } from "@/constants";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface CardImageChoiceProps {
  exercise: Exercise;
  isMistake?: boolean;
}

const CardImageChoice: React.FC<CardImageChoiceProps> = ({
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

  const [active, setActive] = useState(stateActive);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const dispatch = useDispatch();

  const localization = useSelector(getLocalization);

  const getCorrect = (variant: string) =>
    exercise.chooses &&
    exercise.correctAnswerIndex !== undefined &&
    exercise.chooses[exercise.correctAnswerIndex] === variant;

  const handleSubmit = () => {
    if (getCorrect(active)) {
      setIsCorrect(true);
      dispatch(updateExercise({ ...exercise, completed: true }));
      updatePostProgress(exercise.lesson, exercise._id, "completed");
    } else {
      dispatch(setWrongCompletedExersises(exercise._id));
      setIsCorrect(false);
    }
  };

  const handleActive = (variant: string) => {
    if (exercise.completed && !isMistake) return;
    setActive(variant);
  };

  const chooses = exercise.chooses;

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.webCard}>
        <Box className={styles.cardBox}>
          <img alt="" src={exercise.imageURL} className={styles.cardImage} />
          <Stack spacing={2} sx={{ textAlign: "center", width: "100%", p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {localization[ELocalization.CHOOSE_WORD]}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              {chooses?.map((variant: string, index: number) => (
                <Button
                  key={index}
                  onClick={() => handleActive(variant)}
                  sx={{ mr: 1, flexGrow: 1, maxHeight: "fit-content" }}
                  variant="empty"
                  className={`${styles.button} ${
                    active === variant ? styles.active : ""
                  } ${
                    active === variant && (isCorrect || exercise.completed)
                      ? styles.correct
                      : ""
                  }`}
                >
                  {variant}
                </Button>
              ))}
            </Box>
          </Stack>
        </Box>

        <NavigationButtons
          exercise={exercise}
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
          onNext={handleSubmit}
          isMistake={isMistake}
        />
      </Box>
    </Box>
  );
};

export default CardImageChoice;
