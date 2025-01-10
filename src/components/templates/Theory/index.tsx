import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import NavigationButtons from "@/components/molecules/NavigationButtons";

import Reading from "@/assets/reading-example.png";

import { getProfile } from "@/store/profile";
import { ETranslate } from "@/constants";
import { getNextExerciseId, setCurrentExercise } from "@/store/ActiveLesson";
import { updatePostProgress } from "@/utils/apiHelpers";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  exercise: Exercise;
}

export const Theory: React.FC<IProps> = ({ exercise }) => {
  const profile = useSelector(getProfile);
  const nextExerciseId = useSelector(getNextExerciseId);

  const dispatch = useDispatch();

  const handleText = () => {
    if (
      typeof exercise.text === "object" &&
      !Array.isArray(exercise.text) &&
      exercise.text !== null
    ) {
      let text = exercise.text?.[profile?.locale || ETranslate.ENGLISH];

      text = text.replaceAll("- ", "● ");

      return text.replace(/\*\*(.*?)\*\*/g, function (value: string) {
        const filter = value.replace(/\*/g, "");
        return "<b>" + filter + "</b>";
      });
    }

    return "";
  };

  const handleSubmit = async () => {
    dispatch(setCurrentExercise(nextExerciseId || ""));
    updatePostProgress(exercise.lesson, exercise._id, "completed");
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.webCard}>
        <Box className={styles.cardsContainer}>
          <Box className={styles.cardSwiper}>
            <Box className={`${styles.cardBox}`}>
              <img alt="" src={Reading} className={styles.cardImage} />
              <Box className={styles.cardTextContainer}>
                <h3 className={styles.cardTitle}>
                  {exercise.title?.[profile?.locale || ETranslate.ENGLISH]}
                </h3>
                <p
                  className={styles.cardText}
                  dangerouslySetInnerHTML={{ __html: handleText() }}
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
      </Box>
    </Box>
  );
};
