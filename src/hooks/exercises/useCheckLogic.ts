import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAlert } from "@/components/organisms/AlertMessage";
import { ELocalization, ERoutes } from "@/constants";
import {
  getActiveCourse,
  getWrongExersises,
  resetActiveCourse,
  selectExercise,
  setExercises,
  setNextExercise,
  setStartLesson,
  setWrongCompletedExersises
} from "@/store/ActiveLesson";
import { getLocalization } from "@/store/localization";
import { getProfile } from "@/store/profile";
import { logEvent } from "@/utils/amplitude";

interface UseCheckNextLogicProps {
  isCorrect: boolean | null;
  setIsCorrect: (a: boolean | null) => void;
  lastCard?: boolean;
  nextId: string;
  currentId: string;
}

export const useCheckLogic = ({ isCorrect, lastCard, nextId, setIsCorrect, currentId }: UseCheckNextLogicProps) => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const activeCourse = useSelector(getActiveCourse);
  const wrongExersises = useSelector(getWrongExersises);
  const localization = useSelector(getLocalization);
  const activeLesson = useSelector(selectExercise);
  const profile = useSelector(getProfile);

  const handleCorrectAnswer = () => {
    showAlert(true, localization[ELocalization.NOTIFICATION_SUCCESS]);
    setTimeout(() => dispatch(setNextExercise(nextId)), 500);
  };

  const handleIncorrectAnswer = () => {
    logEvent(`web_${profile?.level}_show_error`);

    dispatch(setWrongCompletedExersises(currentId));
    showAlert(false, localization[ELocalization.NOTIFICATION_FAIL]);
    setIsCorrect(null);
  };

  const handleCourseCompletion = () => {
    showAlert(true, `The ${activeCourse?.courseType} course was successfully completed!`);
    setTimeout(() => {
      dispatch(resetActiveCourse());
      navigate(ERoutes.COURSES);
    }, 500);
  };

  const handleCourseRestartWithWrongEx = () => {
    dispatch(setExercises(wrongExersises));
    setTimeout(() => {
      const lesson = {
        courseId: activeCourse?.courseId || '',
        courseType: activeCourse?.courseType || '',
        title: activeCourse?.title || '',
        exercises: [],
        lessonId: activeLesson?.lessonId || '',
      }
      dispatch(setStartLesson(
        lesson
      ));
      navigate(`${ERoutes.COURSES}/${activeCourse?.courseType}/${activeCourse?.courseId}`);
    }, 500);
  }

  useEffect(() => {
    if (isCorrect) {
      lastCard ? (wrongExersises.length ? handleCourseRestartWithWrongEx() : handleCourseCompletion()) : handleCorrectAnswer();
    } else if (isCorrect === false) {
      handleIncorrectAnswer();
    }
  }, [isCorrect, lastCard]);
};
