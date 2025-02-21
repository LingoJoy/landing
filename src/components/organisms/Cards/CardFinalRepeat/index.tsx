import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardContentWrapper } from "@/components/atoms/CardWrapper";

import Couple from "@/assets/couple.png";

import { ELocalization, EUrls } from "@/constants";
import {
  resetActiveCourse,
  selectExercise,
  setStartLesson,
} from "@/store/ActiveLesson";
import { User } from "@/store/auth/query";
import { getLocalization } from "@/store/localization";
import { getProfile, setProfile } from "@/store/profile";
import axios from "@/utils/AxiosConfig";
import { logEvent } from "@/utils/amplitude";
import { updatePostProgress } from "@/utils/apiHelpers";
import { useAlert } from "../../AlertMessage";

import styles from "./index.module.scss";

const commonButtonStyles = {
  width: "100%",
  minWidth: "auto",
  mt: "auto",
  padding: {
    xs: "8px",
    sm: "12px",
  },
  fontSize: {
    xs: "14px",
    sm: "16px",
  },
};

const CardFinalRepeat: React.FC = () => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const lesson = useSelector(selectExercise);
  const profile = useSelector(getProfile);
  const localization = useSelector(getLocalization);

  const handleSubmit = async () => {
    try {
      const { data }: { data: User } = await axios.post(
        `${EUrls.USERS_PROGRESS}/${lesson.lessonId}/complete`,
      );

      logEvent(`web_${profile?.level}_on_review`);

      dispatch(setProfile(data));
      dispatch(resetActiveCourse());

      updatePostProgress(
        lesson.lessonId,
        lesson.currentExercise?._id || "",
        "completed",
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepeat = async () => {
    logEvent(`web_${profile?.level}_on_restart`);
    try {
      const { data } = await axios.post(
        `${EUrls.USERS_PROGRESS}/${lesson?.lessonId || ""}/reset`,
      );

      dispatch(setProfile(data));
      dispatch(
        setStartLesson({
          courseId: lesson.activeCourse?.courseId || "",
          courseType: lesson.activeCourse?.courseType || "",
          title: lesson.activeCourse?.title || "",
          exercises: lesson.exercises,
          lessonId: lesson?.lessonId || "",
        }),
      );
    } catch (error) {
      showAlert(false, localization[ELocalization.SOMETHING_WRONG]);
    }
  };

  return (
    <CardContentWrapper contentSx={{ p: 0, maxWidth: "100%" }}>
      <Box className={styles.imagesBox}>
        <Box className={styles.ellipse} />
        <img src={Couple} alt="" className={styles.mainSvg} />
        <Box className={styles.blur} />
      </Box>

      <Stack spacing={2} sx={{ textAlign: "center", maxHeight: "30vh" }}>
        <Typography className={styles.cardTextTitle}>
          {localization[ELocalization.FINISH_COURSE_TITLE]}
        </Typography>
        <Typography
          className={styles.cardTextSubTitle}
          variant="cardSubtitle"
          sx={{ mb: 2 }}
        >
          {localization[ELocalization.FINISH_COURSE_DESCR]}
        </Typography>
      </Stack>

      <Box className={styles.buttonWrapper}>
        <Typography className={styles.cardTextAgain} variant="cardSubtitle">
          {localization[ELocalization.GO_AGAIN]}
        </Typography>
        <Box className={styles.buttonBox}>
          <Button className={styles.closeBtn} onClick={handleSubmit}>
            {localization[ELocalization.NO]}
          </Button>
          <Button variant="main" sx={commonButtonStyles} onClick={handleRepeat}>
            {localization[ELocalization.YES]}
          </Button>
        </Box>
      </Box>
    </CardContentWrapper>
  );
};

export default CardFinalRepeat;
