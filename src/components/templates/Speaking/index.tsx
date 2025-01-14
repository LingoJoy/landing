import "regenerator-runtime/runtime";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import PlayButton from "@/components/molecules/PlayButton";
import AudioRecoder from "@/components/molecules/AudioRecoder";
import CardWrapper from "@/components/organisms/CardWrapper";
import NavigationButtons from "@/components/molecules/NavigationButtons";

import { randomIntFromInterval } from "@/utils/randomIntFromInterval";
import { setWrongCompletedExersises } from "@/store/ActiveLesson";
import { ELocalization } from "@/constants";
import { updatePostProgress } from "@/utils/apiHelpers";
import { getLocalization } from "@/store/localization";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  exercise: Exercise;
  isMistake?: boolean;
}

const interval = randomIntFromInterval(1, 3);

export const Speaking: React.FC<IProps> = ({ exercise, isMistake }) => {
  const [transcription, setTranscription] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const localization = useSelector(getLocalization);

  const handleCorrect = () => {
    if (!exercise.correctText) return true;
    let correct = 0;

    const step = 100 / exercise.correctText.toLowerCase().split(" ").length;
    const correctText = exercise.correctText.toLowerCase() || "";
    const transcript = transcription.toLowerCase();

    transcript.split(" ").forEach((el) => {
      if (correctText.includes(el)) correct = correct + step;
    });

    return correct >= 75;
  };

  const handleCheck = () => {
    if (transcription && handleCorrect()) {
      setIsCorrect(true);
      updatePostProgress(exercise.lesson, exercise._id, "completed");
    } else {
      setIsCorrect(false);
      dispatch(setWrongCompletedExersises(exercise._id));
    }
  };

  useEffect(() => {
    if (exercise.audioURL) setUrl(exercise.audioURL);
  }, [exercise.audioURL]);

  return (
    <Box className={styles.background}>
      <Box>
        <ContentWrapper>
          <CardWrapper>
            <Box className={styles.cardWrapper}>
              <Box className={styles.cardBox}>
                <Box
                  className={`${styles.cardContent} ${
                    styles[`cardContentVariant-${interval}`]
                  }`}
                >
                  <Box className={styles.cardContentBox}>
                    <Typography
                      className={styles.task}
                      sx={{ fontSize: "0.75rem", lineHeight: "1.25rem" }}
                    >
                      {localization[ELocalization.SAY]}
                    </Typography>
                    <Box className={styles.cardAudioWrapper}>
                      <Box>
                        {exercise.correctText?.split(" ").map((el, i) => (
                          <Typography
                            component="span"
                            className={styles.taskText}
                            sx={{
                              fontSize: "1.5rem",
                              lineHeight: "1.25rem",
                              textAlign: "center",
                              color: transcription.includes(el.toLowerCase())
                                ? "#3F97FF"
                                : "#303030",
                            }}
                            key={i}
                          >
                            {el}{" "}
                          </Typography>
                        ))}
                      </Box>
                      <Box className={styles.cardAudioBox}>
                        {url ? <PlayButton url={url} /> : null}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={styles.audioControl}>
                  {exercise.correctText && (
                    <AudioRecoder
                      onTranscription={setTranscription}
                      values={exercise.correctText.split(" ") || []}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </CardWrapper>
        </ContentWrapper>
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
  );
};
