import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Stack,
  FormControl,
  Button,
  useMediaQuery,
} from "@mui/material";

import PlayButton from "@/components/molecules/PlayButton";

import MainImage from "@/assets/boy-with-map.png";

import { selectExercise, setNextExercise } from "@/store/ActiveLesson";
import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";
import { getProfile } from "@/store/profile";

import { Exercise } from "@/types";

import styles from "./index.module.scss";

interface CardCheckAllProps {
  exercise: Exercise;
}

const CardCheckAll: React.FC<CardCheckAllProps> = ({ exercise }) => {
  const localization = useSelector(getLocalization);
  const lesson = useSelector(selectExercise);
  const profile = useSelector(getProfile);

  const dispatch = useDispatch();

  const isNotMobile = useMediaQuery("(min-width:600px)");

  const handleSubmit = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_on_finish`);
    dispatch(setNextExercise());
  };

  const words =
    exercise.words && exercise.words.every((item) => typeof item !== "string")
      ? exercise.words
      : [];

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.webCard}>
        <Box className={styles.cardBox}>
          <img alt="" src={MainImage} className={styles.cardImage} />
          <Stack
            spacing={2}
            sx={{
              textAlign: "center",
              width: "100%",
              pt: 2,
              maxHeight: "360px",
              overflowY: "auto",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {localization[ELocalization.REPEAT_WORDS]}
            </Typography>
            <Box>
              {words.map((el) => (
                <Box key={el.word} className={styles.optionWrapper}>
                  <Box className={styles.optionTextWrapper}>
                    <Typography className={styles.optionTitle}>
                      {el.word}
                    </Typography>
                  </Box>
                  <PlayButton url={el.audioURL} />
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
        <FormControl
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: isNotMobile ? "32px 10px" : "10px",
          }}
        >
          <Button
            sx={{ width: "100%", maxWidth: "351px" }}
            onClick={handleSubmit}
          >
            {localization[ELocalization.FINISH]}
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CardCheckAll;
