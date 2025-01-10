import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button } from "@mui/material";

import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

import Delete from "@/assets/card-img/tag-cross.svg";

import { ALPHABET, ELocalization } from "@/constants";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";
import { updateExercise } from "@/store/ActiveLesson";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface ICardAlphabetProps {
  exercise: Exercise;
  isMistake?: boolean;
}

interface IAlphabetCounter {
  [x: string]: number;
}

const getSigns = (string: string) => {
  const result: IAlphabetCounter = {};

  const arr = string.toLowerCase().split("");
  arr.forEach((el) =>
    result[el] ? (result[el] = result[el] + 1) : (result[el] = 1),
  );

  return result;
};

const CardAlphabet: React.FC<ICardAlphabetProps> = ({
  exercise,
  isMistake,
}) => {
  const stateActive =
    exercise.completed && !isMistake && exercise.missWord
      ? exercise.missWord.toLocaleLowerCase()
      : "";

  const [selectedWord, setSelectedWord] = useState<string>(stateActive);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [counter, setCounter] = useState<IAlphabetCounter>(
    getSigns(exercise.missWord?.toLocaleLowerCase() || ""),
  );

  const dispatch = useDispatch();
  const localization = useSelector(getLocalization);

  const qwertyAlphabet = ALPHABET.split("");
  const firstRow = qwertyAlphabet.slice(0, 10);
  const secondRow = qwertyAlphabet.slice(10, 19);
  const thirdRow = qwertyAlphabet.slice(19, qwertyAlphabet.length);

  const missWord = exercise.missWord?.toLocaleLowerCase() || "";
  const disabled = selectedWord.length !== missWord.length;

  const handleCheck = () => {
    if (selectedWord.toLocaleLowerCase() === missWord) {
      setIsCorrect(true);
      dispatch(updateExercise({ ...exercise, completed: true }));
      updatePostProgress(exercise.lesson, exercise._id, "completed");
    } else {
      setSelectedWord("");
      setIsCorrect(false);
      setCounter(getSigns(missWord));
    }
  };

  const handleLetterClick = (letter: string) => {
    if (exercise.completed && !isMistake) return;

    if (counter[letter]) {
      setSelectedWord((prev) => prev + letter);

      const newCounter = { [letter]: counter[letter] - 1 };

      setCounter((prev) => ({ ...prev, ...newCounter }));
    }
  };

  const handleDeleteClick = () => {
    if (exercise.completed && !isMistake) return;
    const selectedSign = selectedWord[selectedWord.length - 1];

    const newCounter = { [selectedSign]: counter[selectedSign] + 1 };

    setCounter((prev) => ({ ...prev, ...newCounter }));

    setSelectedWord((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (missWord.includes(e.key)) handleLetterClick(e.key);
      if (e.key === "Backspace") handleDeleteClick();
      if (e.key === "Enter" && !disabled) handleCheck();
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const text =
    typeof exercise.text === "string" ? exercise.text.split(" ") : [""];
  const textComponents = text.map((el, i) => {
    return el === "_" ? (
      <span className={styles.missingWord} key={i}>
        {selectedWord}
      </span>
    ) : (
      <span key={i}>{el}</span>
    );
  });

  return (
    <CardContentWrapper
      contentSx={{ p: 0, maxWidth: "100%" }}
      cardSx={{ p: 0 }}
    >
      <Box className={styles.textBox}>
        <Box className={styles.text}>{textComponents}</Box>
      </Box>
      <Box className={styles.webWrapper}>
        <Box className={styles.cardWrapper}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {localization[ELocalization.TRANSLATION]}
          </Typography>
          <Box className={styles.alphabetWrapper}>
            {[firstRow, secondRow, thirdRow].map((row, i, arr) => (
              <Box key={`Row - ${i}`} className={styles.row}>
                {row.map((letter, ind) => (
                  <React.Fragment key={letter}>
                    <Button
                      variant="empty"
                      className={`${styles.letterButton} ${
                        !counter[letter] ? styles.active : ""
                      }`}
                      onClick={() => handleLetterClick(letter)}
                      color={
                        !counter[letter] || exercise.completed
                          ? "info"
                          : "primary"
                      }
                      disabled={!counter[letter] || exercise.completed}
                    >
                      {letter}
                    </Button>
                    {i === arr.length - 1 && ind === row.length - 1 && (
                      <Button
                        variant="empty"
                        sx={{ maxHeight: "40px", maxWidth: "40px", p: "5px" }}
                        color={"info"}
                        onClick={handleDeleteClick}
                      >
                        <Delete />
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            ))}
          </Box>
        </Box>

        <NavigationButtons
          isDontKnowButton
          exercise={exercise}
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
          onNext={handleCheck}
          isMistake={isMistake}
        />
      </Box>
    </CardContentWrapper>
  );
};

export default CardAlphabet;
