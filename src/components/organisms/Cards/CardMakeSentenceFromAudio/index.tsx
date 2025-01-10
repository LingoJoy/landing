import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  Typography,
  Divider,
  Grid,
  useMediaQuery,
} from "@mui/material";

import WordOption from "@/components/atoms/WordOption";
import Waveform from "@/components/molecules/Waveform";
import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

import GirlWithGlasses from "@/assets/girl-glasses.png";

import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";
import { updateExercise } from "@/store/ActiveLesson";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface CardMakeSentenceFromAudioProps {
  exercise: Exercise;
  isMistake?: boolean;
}

const filterUnique = (arr: string[], string: string) => {
  const index = arr.findIndex((el) => el === string);
  return arr.filter((_, i) => i !== index);
};

const CardMakeSentenceFromAudio: React.FC<CardMakeSentenceFromAudioProps> = ({
  exercise,
  isMistake,
}) => {
  const userOption =
    exercise.completed && exercise.correctText && !isMistake
      ? exercise.correctText.split(" ")
      : [];

  const userWords =
    exercise.completed && exercise.correctText && !isMistake
      ? exercise.correctText.split(" ")
      : exercise.words.map((el) => (typeof el === "string" ? el : ""));

  const [word, setWord] = useState<string | null>(null);
  const [words, setWords] = useState<string[]>(userWords);
  const [selectedWords, setSelectedWords] = useState<string[]>(userOption);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const isNotMobile = useMediaQuery("(min-width:600px)");

  const localization = useSelector(getLocalization);

  const dispatch = useDispatch();

  const handleCheck = () => {
    if (exercise.completed) return;

    if (
      exercise.correctText &&
      selectedWords.join(" ") === exercise.correctText
    ) {
      dispatch(updateExercise({ ...exercise, completed: true }));
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleWordClick = (el: string) => {
    if (exercise.completed && !isMistake) return;

    setWord(el);

    setSelectedWords([...selectedWords, el]);
    setWords(filterUnique(words, el));
  };

  const handleRemoveWordClick = (el: string) => {
    if (exercise.completed && !isMistake) return;

    setSelectedWords(filterUnique(selectedWords, el));
    setWords([...words, el]);
  };

  return (
    <CardContentWrapper
      cardSx={{
        borderRadius: isNotMobile ? "30px" : "0px",
      }}
      contentSx={{ p: isNotMobile ? "32px" : 1 }}
    >
      <Box className={styles.cardBox}>
        <img alt="" src={GirlWithGlasses} className={styles.cardImage} />
        <Box className={styles.cardContent}>
          <FormControl fullWidth>
            <Typography
              sx={{ fontSize: "12px", pb: 1 }}
              variant="body2"
              color="text.secondary"
            >
              {localization[ELocalization.PHRASE_ON_AUDIO]}
            </Typography>
            <Box className={styles.waveformContainer}>
              {exercise.audioURL ? <Waveform url={exercise.audioURL} /> : null}
            </Box>
          </FormControl>
        </Box>
      </Box>
      <Grid container className={styles.selectedWordsWrapper}>
        {selectedWords.map((el, i) => (
          <Grid item key={`SelectedWord=${i}`}>
            <Button
              variant="empty"
              sx={{ minWidth: "50px" }}
              className={styles.selectedWordButton}
              onClick={() => handleRemoveWordClick(el)}
            >
              {el}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mt: 1 }} />

      <Box sx={{ mb: "auto" }}>
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.task}
          mt={3}
        >
          {localization[ELocalization.SELECT_OPTIONS]}
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

export default CardMakeSentenceFromAudio;
