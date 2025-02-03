import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useMediaQuery } from "@mui/material";

import CardField from "@/components/atoms/CardField";
import WordOption from "@/components/atoms/WordOption";
import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

// import BoyWithLaptopImage from "@/assets/boy-with-laptop.png";
import BoyOnChairImage from "@/assets/boy-on-chair.png";

import { ELocalization } from "@/constants";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";
import { updateExercise } from "@/store/ActiveLesson";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface CardPutWordsProps {
  exercise: Exercise;
  isMistake?: boolean;
}

const CardPutWords: React.FC<CardPutWordsProps> = ({ exercise, isMistake }) => {
  const userOption =
    exercise.completed && exercise.correctWords && !isMistake
      ? exercise.correctWords
      : [];

  const userWords =
    exercise.completed && exercise.correctWords && !isMistake
      ? exercise.correctWords
      : exercise.words.map((el) => (typeof el === "string" ? el : ""));

  const [word, setWord] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>(userWords);
  const [sentence, setSentence] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>(userOption);
  const [wrongIndexes, setWrongIndexes] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const isNotMobile = useMediaQuery("(min-width:426px)");

  const localization = useSelector(getLocalization);

  const dispatch = useDispatch();

  const handleCheck = () => {
    let checking = true;

    exercise.correctWords?.forEach((el, i) => {
      if (el.toLowerCase() !== selectedWords[i].toLowerCase()) {
        checking = false;
        setWrongIndexes([...wrongIndexes, i]);
      }
    });

    if (checking) {
      setIsCorrect(true);
      dispatch(updateExercise({ ...exercise, completed: true }));
      updatePostProgress(exercise.lesson, exercise._id, "completed");
      setWrongIndexes([]);
    } else {
      setIsCorrect(false);
    }
  };

  const handleWordClick = (el: string) => {
    if (exercise.completed && !isMistake) return;

    setWord(el);

    if (selectedWords.length === exercise.correctWords?.length) return;

    if (!selectedWords.includes(el)) {
      setSelectedWords([...selectedWords, el]);
    }
  };

  const handleRemoveWordClick = (el: string) => {
    if (exercise.completed && !isMistake) return;

    setSelectedWords(selectedWords.filter((word) => word !== el));
    setWrongIndexes([]);
  };

  useEffect(() => {
    if (!exercise.putWordText) return;

    const newSentence = exercise.putWordText.split("_");

    if (
      exercise.words &&
      exercise.correctWords &&
      exercise.words.every((item) => typeof item === "string")
    ) {
      setSentence(newSentence);
      const allOptions = exercise.words
        ?.map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setWords(allOptions.sort(() => Math.random() - 0.5));
    }
  }, [exercise]);

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
            <Fragment key={`Sent-${i}`}>
              <Typography sx={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}>
                {el}
              </Typography>
              {i !== sentence.length - 1 && (
                <Box
                  className={styles.cardField}
                  onClick={() => handleRemoveWordClick(selectedWords[i])}
                >
                  {selectedWords[i] ? (
                    <WordOption
                      title={selectedWords[i]}
                      isCorrect={isCorrect}
                      isError={wrongIndexes.includes(i)}
                    />
                  ) : (
                    <CardField height="50px" />
                  )}
                </Box>
              )}
            </Fragment>
          ))}
        </Box>
        <img
          src={isNotMobile ? BoyOnChairImage : `${import.meta.env.VITE_BACKEND_IMAGE_URL}boy-with-laptop.png`}
          alt="boy"
          className={isNotMobile ? styles.cardImgDesktop : styles.cardImgMobile}
        />
      </Box>
      <Box>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.task}
        >
          {localization[ELocalization.CHOOSE_WORD]}
        </Typography>
        <Box className={styles.wordWrapper}>
          {words.map((el, i) => (
            <Box
              className={styles.wordOption}
              key={`Word=${i}`}
              onClick={() => handleWordClick(el)}
            >
              <WordOption title={el} active={el === word} />
            </Box>
          ))}
        </Box>
      </Box>
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

export default CardPutWords;
