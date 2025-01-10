import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";

import CardField from "@/components/atoms/CardField";
import WordOption from "@/components/atoms/WordOption";
import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

import GirlWithLaptopImage from "@/assets/girl-with-laptop.png";
import GirlOnChairImage from "@/assets/girl-on-chair.png";

import { ELocalization } from "@/constants";
import { updateExercise } from "@/store/ActiveLesson";
import { getLocalization } from "@/store/localization";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  exercise: Exercise;
  isMistake?: boolean;
}

export const BuildSentence: React.FC<IProps> = ({ exercise, isMistake }) => {
  const userOption =
    exercise.completed && exercise.correctText && !isMistake
      ? exercise.correctText.split(" ")
      : exercise.correctText?.split(" ").map(() => null) || [];

  const userWords =
    exercise.completed && exercise.correctText && !isMistake
      ? exercise.correctText.split(" ")
      : exercise.words.map((el) => (typeof el === "string" ? el : ""));

  const [words, setWords] = useState<(string | null)[]>(userWords);
  const [sentence, setSentence] = useState<(string | null)[]>(userOption);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const isNotMobile = useMediaQuery("(min-width:600px)");

  const dispatch = useDispatch();

  const localization = useSelector(getLocalization);

  const handleCheck = () => {
    if (exercise.correctText && sentence.join(" ") === exercise.correctText) {
      setIsCorrect(true);
      dispatch(
        updateExercise({
          ...exercise,
          completed: true,
        }),
      );
    } else {
      setIsCorrect(false);
    }
  };

  const handleSentence = (word: string | null) => {
    if (!word) return;

    const newIndex = sentence.findIndex((el) => el === null);
    const newSentence = [...sentence];
    newSentence[newIndex < 0 ? 0 : newIndex] = word;

    setSentence(newSentence);
    removeWord(word);
  };

  const removeWord = (word: string) => {
    if (exercise.completed && !isMistake) return;

    const newIndex = words.findIndex((el) => el === word);
    const newWords = [...words];
    newWords[newIndex < 0 ? 0 : newIndex] = null;

    setWords(newWords);
  };

  const removeSentence = (word: string | null) => {
    if (!word || (exercise.completed && !isMistake)) return;

    const newIndex = sentence.findIndex((el) => el === word);
    const newSentence = [...sentence];
    newSentence[newIndex < 0 ? 0 : newIndex] = null;

    setSentence(newSentence);
    handleWord(word);
  };

  const handleWord = (word: string) => {
    if (exercise.completed && !isMistake) return;

    const newIndex = words.findIndex((el) => el === null);
    const newWords = [...words];
    newWords[newIndex < 0 ? 0 : newIndex] = word;

    setWords(newWords);
  };

  return (
    <CardContentWrapper
      cardSx={{
        borderRadius: isNotMobile ? "30px" : "0px",
        p: 0,
      }}
      contentSx={{ p: isNotMobile ? "32px" : 1 }}
    >
      <Box className={styles.cardWrapper}>
        <Box className={styles.answerWrapper}>
          {sentence.map((el, i) => (
            <Box
              className={styles.wordOption}
              key={`Word=${i}`}
              onClick={() => removeSentence(el)}
            >
              {el ? (
                <WordOption title={el} />
              ) : (
                <CardField size="small" height="50px" />
              )}
            </Box>
          ))}
        </Box>
        <img
          src={isNotMobile ? GirlOnChairImage : GirlWithLaptopImage}
          alt="boy"
          className={isNotMobile ? styles.cardImgDesktop : styles.cardImgMobile}
        />
      </Box>
      {words.filter((el) => el).length > 0 && (
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            className={styles.task}
          >
            {localization[ELocalization.SELECT_OPTIONS]}
          </Typography>
          <Box className={styles.wordWrapper}>
            {words.map((el, i) => (
              <Box
                key={`Sent=${i}`}
                className={styles.sentenceBox}
                onClick={() => handleSentence(el)}
              >
                {el ? <WordOption title={el} /> : null}
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <NavigationButtons
        isDontKnowButton
        exercise={exercise}
        isCorrect={isCorrect}
        setIsCorrect={setIsCorrect}
        onNext={handleCheck}
        isMistake={isMistake}
      />
    </CardContentWrapper>
  );
};
