import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardContentWrapper } from "@/components/atoms/CardWrapper";

import Couple from "@/assets/couple.png";

import { ELocalization, EUrls } from "@/constants";
import { resetActiveCourse, selectExercise } from "@/store/ActiveLesson";
import { User } from "@/store/auth/query";
import { getLocalization } from "@/store/localization";
import { getProfile, setProfile } from "@/store/profile";
import axios from "@/utils/AxiosConfig";
import { logEvent } from "@/utils/amplitude";
import { updatePostProgress } from "@/utils/apiHelpers";

import styles from "./index.module.scss";

const CardFinal: React.FC = () => {
  const dispatch = useDispatch();

  const lesson = useSelector(selectExercise);
  const profile = useSelector(getProfile);
  const localization = useSelector(getLocalization);

  const handleSubmit = async () => {
    logEvent(`web_${profile?.level}_on_home`);

    try {
      const { data }: { data: User } = await axios.post(
        `${EUrls.USERS_PROGRESS}/${lesson.lessonId}/complete`,
      );

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

  return (
    <CardContentWrapper contentSx={{ p: 0, maxWidth: "100%" }}>
      <Box className={styles.imagesBox}>
        <Box className={styles.ellipse} />
        <img src={Couple} alt="" className={styles.mainSvg} />
        <Box className={styles.blur} />
      </Box>

      <Stack spacing={2} sx={{ textAlign: "center", maxHeight: "30vh" }}>
        <Typography className={styles.cardTextTitle}>
          {localization[ELocalization.CONGRATULATIONS]}
        </Typography>
        <Typography
          className={styles.cardTextSubTitle}
          variant="cardSubtitle"
          sx={{ mb: 2 }}
        >
          {localization[ELocalization.LESSON_COMPLETE]}
        </Typography>
      </Stack>

      <Box className={styles.buttonWrapper}>
        <Button sx={{ width: "100%" }} onClick={handleSubmit}>
          {localization[ELocalization.RETURN_TO_HOME_COURSE]}
        </Button>
      </Box>
    </CardContentWrapper>
  );
};

export default CardFinal;
