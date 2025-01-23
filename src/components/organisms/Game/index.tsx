import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BuildSentence, Read, Speaking, Theory } from "@/components/templates";
import { GameLayout } from "@/components/templates/GameLayout";
import { ReadBook } from "@/components/templates/ReadBook";
import {
  CardAlphabet,
  CardBooleanChoice,
  CardCheckAll,
  CardFinal,
  CardImageChoice,
  CardListenAndChose,
  CardMakeSentenceFromAudio,
  CardMatchPicture,
  CardProgressResult,
  CardPutWords,
  SwipedCard,
} from "../Cards";
import CardFinalRepeat from "../Cards/CardFinalRepeat";

import { EExerciseType } from "@/constants";
import {
  getNextExerciseId,
  hideGood,
  selectExercise
} from "@/store/ActiveLesson";
import { getBook } from "@/store/book";
import { getProfile } from "@/store/profile";
import { getFinished } from "@/utils/courseHelpers";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  currentExercise: Exercise;
}

const Lesson = () => {
  const dispatch = useDispatch();

  const lesson = useSelector(selectExercise);
  const nextExerciseId = useSelector(getNextExerciseId);
  const profile = useSelector(getProfile);

  const renderExercise = (exercise: Exercise, nextExerciseId: string) => {
    switch (exercise.type) {
      case EExerciseType.SWIPE_LEARN_CARD:
        return (
          <SwipedCard
            exercise={exercise}
            nextId={nextExerciseId}
            key={exercise._id}
          />
        );
      case EExerciseType.SWIPE_LEARN_CARDS:
        return (
          <SwipedCard
            exercise={exercise}
            nextId={nextExerciseId}
            key={exercise._id}
          />
        );
      case EExerciseType.MAKE_SENTENCE_FROMAUDIO:
        return (
          <CardMakeSentenceFromAudio key={exercise._id} exercise={exercise} />
        );
      case EExerciseType.CHOOSE_CORRECT_WORD:
        return <CardImageChoice key={exercise._id} exercise={exercise} />;
      case EExerciseType.PUT_CORRECT_WORD:
        return <CardPutWords key={exercise._id} exercise={exercise} />;
      case EExerciseType.CHOOSE_SENTENCE_FROMAUDIO:
        return <CardListenAndChose key={exercise._id} exercise={exercise} />;
      case EExerciseType.WORD_INSENTENCE:
        return <CardAlphabet key={exercise._id} exercise={exercise} />;
      case EExerciseType.MATCH_PICTURE:
        return <CardMatchPicture key={exercise._id} exercise={exercise} />;
      case EExerciseType.TEXT_TRUE_OR_FALSE:
        return <CardBooleanChoice key={exercise._id} exercise={exercise} />;
      case EExerciseType.FINAL:
        return <CardCheckAll key={exercise._id} exercise={exercise} />;
      case EExerciseType.SPEAKING_LISTEN_REPEAT:
        return <Speaking exercise={exercise} />;
      case EExerciseType.MAKE_SENTENCE:
        return <BuildSentence key={exercise._id} exercise={exercise} />;
      case EExerciseType.FINAL_THEORY:
        return <Read key={exercise._id} exercise={exercise} />;
      case EExerciseType.THEORY:
        return <Theory key={exercise._id} exercise={exercise} />;
      default:
        return null;
    }
  };

  const handleHideInter = () => {
    dispatch(hideGood());
  };

  const finished = getFinished(lesson.lessonId, profile?.lessons || {});

  if (finished) return <CardFinalRepeat />;

  if (lesson.goodShow)
    return (
      <CardProgressResult
        resultType={lesson.goodIndex}
        onClick={handleHideInter}
      />
    );

  if (lesson.gameFinished) return <CardFinal />;

  if (lesson.currentExercise)
    return renderExercise(lesson.currentExercise, nextExerciseId);
};

const Game: FC<IProps> = ({ currentExercise }) => {
  const dispatch = useDispatch();

  const nextExerciseId = useSelector(getNextExerciseId);
  const book = useSelector(getBook);

  const layoutClassName =
    currentExercise?.type === EExerciseType.SWIPE_LEARN_CARD ||
    currentExercise?.type === EExerciseType.CHOOSE_CORRECT_WORD ||
    currentExercise?.type === EExerciseType.SPEAKING_LISTEN_REPEAT
      ? styles.lessonBlueWrapper
      : styles.lessonWrapper;

  const layoutBgType =
    currentExercise?.type === EExerciseType.SWIPE_LEARN_CARD ||
    currentExercise?.type === EExerciseType.CHOOSE_CORRECT_WORD ||
    currentExercise?.type === EExerciseType.SPEAKING_LISTEN_REPEAT
      ? 2
      : 1;

  if (book) return <ReadBook book={book} />;

  return (
    <GameLayout className={layoutClassName} backgroundType={layoutBgType}>
      {/* Test button */}
      {/* <button
        onClick={() => {
          dispatch(setNextExercise(nextExerciseId || ""));
        }}
        style={{
          position: "absolute",
          top: "100px",
          left: "50%",
          background: "#3f97ff",
          borderRadius: "30px",
          padding: "5px 10px",
          color: "#fff",
          transform: "translateX(-50%)",
          zIndex: "10",
        }}
      >
        Test Skip
      </button> */}
      {/*  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
        className={styles.lessonBox}
      >
        <Lesson />
      </Box>
    </GameLayout>
  );
};

export default Game;
