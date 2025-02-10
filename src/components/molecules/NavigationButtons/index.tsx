import { Box, Button } from "@mui/material";
import React, { CSSProperties } from "react";
import { useDispatch, useSelector } from "react-redux";

import Arrow from "@/assets/arrow-full-right.svg";

import { ELocalization } from "@/constants";
import { useCheckLogic } from "@/hooks/exercises/useCheckLogic";
import {
  getNextExerciseId,
  getNextWrongExerciseId,
  getPrevExerciseId,
  getPrevWrongExerciseId,
  selectExercise,
  setCurrentExercise,
  setFinishExercise,
  setNextExercise,
  updateExercise,
} from "@/store/ActiveLesson";
import { getLocalization } from "@/store/localization";
import { getProfile } from "@/store/profile";
import { logEvent } from "@/utils/amplitude";
import { updatePostProgress } from "@/utils/apiHelpers";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  wrapperStyle?: CSSProperties;
  containerStyle?: CSSProperties;
  isDontKnowButton?: boolean;
  onNext: () => void;
  exercise: Exercise;
  isCorrect: boolean | null;
  setIsCorrect: (correct: boolean | null) => void;
  isMistake?: boolean;
}

const NavigationButtons: React.FC<IProps> = ({
  wrapperStyle,
  containerStyle,
  isDontKnowButton,
  exercise,
  isCorrect,
  setIsCorrect,
  onNext,
  isMistake,
}) => {
  const getPrev = !isMistake ? getPrevExerciseId : getPrevWrongExerciseId;
  const getNext = !isMistake ? getNextExerciseId : getNextWrongExerciseId;

  const localization = useSelector(getLocalization);
  const prevExerciseId = useSelector(getPrev);
  const nextExerciseId = useSelector(getNext);
  const lesson = useSelector(selectExercise);
  const profile = useSelector(getProfile);

  const dispatch = useDispatch();

  const handlePrev = () => {
    if (!prevExerciseId) return;
    dispatch(setCurrentExercise(prevExerciseId || ""));
  };

  const handleNext = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_next`);

    if (!nextExerciseId) {
      logEvent(`web_${profile?.level}_[{${lesson.category}]_on_finish`);
      return dispatch(setFinishExercise());
    }

    if (exercise.completed)
      return dispatch(setCurrentExercise(nextExerciseId || ""));

    onNext();

    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_next_completed`);

    // logFBEvent(
    //   `${FB_EVENT.EXERCISE_COMPLETED} ${profile?.level}_[{${lesson.category}]`,
    // );
    // logFBConventionsEvent(
    //   `${FB_EVENT.EXERCISE_COMPLETED} ${profile?.level}_[{${lesson.category}]`,
    //   profile?.email || "",
    // );

    updatePostProgress(exercise.lesson, exercise._id, "completed");
  };

  const handleDontKnow = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_dont_know`);

    dispatch(updateExercise({ ...exercise, completed: true }));

    setTimeout(() => dispatch(setNextExercise(nextExerciseId || "")), 500);

    updatePostProgress(exercise.lesson, exercise._id, "skipped");
  };

  useCheckLogic({
    isCorrect,
    nextId: nextExerciseId,
    setIsCorrect,
    currentId: exercise._id,
  });

  return (
    <Box className={`${styles.wrapper} ${wrapperStyle}`}>
      {isDontKnowButton && (
        <Box className={styles.doNotKnow}>
          <p onClick={handleDontKnow}>
            {localization[ELocalization.DO_NOT_KNOW]}
          </p>
        </Box>
      )}
      <Box className={`${styles.container} ${containerStyle}`}>
        <Button
          variant="main"
          className={`${styles.button} ${
            !prevExerciseId && styles.prevDisabled
          }`}
          onClick={handlePrev}
        >
          <Arrow />
        </Button>
        <Button
          variant="main"
          className={`${styles.button} ${styles.nextBtn} `}
          onClick={handleNext}
        >
          {nextExerciseId
            ? localization[ELocalization.NEXT]
            : localization[ELocalization.FINISH]}
        </Button>
      </Box>
    </Box>
  );
};

export default NavigationButtons;
