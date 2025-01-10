import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack, Typography } from "@mui/material";

import NavigationButtons from "@/components/molecules/NavigationButtons";

import { ELocalization } from "@/constants";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";
import { updateExercise } from "@/store/ActiveLesson";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  exercise: Exercise;
  isMistake?: boolean;
}

const CardBooleanChoice: React.FC<IProps> = ({ exercise, isMistake }) => {
  const localization = useSelector(getLocalization);

  const DEFAULT_OPTIONS = [
    localization[ELocalization.TRUE],
    localization[ELocalization.FALSE],
  ];

  const option = exercise.isTrue ? DEFAULT_OPTIONS[0] : DEFAULT_OPTIONS[1];

  const stateActive = exercise.completed && !isMistake ? option : "";

  const dispatch = useDispatch();
  const [active, setActive] = useState(stateActive);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const getCorrect = (variant: string) =>
    exercise.isTrue === (variant === DEFAULT_OPTIONS[0]);

  const handleSubmit = () => {
    if (getCorrect(active)) {
      setIsCorrect(true);
      dispatch(updateExercise({ ...exercise, completed: true }));
      updatePostProgress(exercise.lesson, exercise._id, "completed");
    } else {
      setIsCorrect(false);
    }
  };

  const getText = () => {
    if (typeof exercise.text === "string") {
      return exercise.text.replace(/\*(.*?)\*/g, function (value) {
        const filter = value.replace(/\*/g, "");
        return `<span class=${styles.checkText}>${filter}</span>`;
      });
    }

    return "";
  };

  const handleActive = (variant: string) => {
    if (exercise.completed && !isMistake) return;
    setActive(variant);
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.webCard}>
        <Box className={styles.cardBox}>
          <Box className={styles.textBox}>
            <p
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: getText() }}
            />
          </Box>
          <Stack spacing={2} sx={{ textAlign: "center", width: "100%", p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {localization[ELocalization.CHOOSE_OPTION]}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              {DEFAULT_OPTIONS.map((variant: string, index: number) => (
                <Button
                  key={index}
                  onClick={() => handleActive(variant)}
                  sx={{ mr: 1, flexGrow: 1 }}
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

export default CardBooleanChoice;
