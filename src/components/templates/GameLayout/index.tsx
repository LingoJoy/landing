import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import HeaderCard from "@/components/organisms/HeaderCard";
import AutoHeightWrapper from "@/components/organisms/AutoHeightWrapper";

import { RootState } from "@/store";
import {
  getActiveCourse,
  resetActiveCourse,
  selectExercise,
} from "@/store/ActiveLesson";
import { logEvent } from "@/utils/amplitude";
import { getProfile } from "@/store/profile";
import { getLocalization } from "@/store/localization";
import {
  renderIconCourseTitle,
  renderIconCourseType,
} from "@/utils/courseHelpers";

import styles from "./index.module.scss";

interface ILayout {
  children?: React.ReactNode;
  className?: string;
  backgroundType?: number;
}

export const GameLayout: React.FC<ILayout> = ({
  children,
  className,
  backgroundType,
}) => {
  const lesson = useSelector(selectExercise);
  const localization = useSelector(getLocalization);
  const profile = useSelector(getProfile);
  const activeCourse = useSelector((state: RootState) =>
    getActiveCourse(state),
  );
  const courseType =
    localization[renderIconCourseTitle(activeCourse?.courseType || "")];
  const description = `${activeCourse?.title} (${profile?.level})`;
  const courseIcon = renderIconCourseType(activeCourse?.courseType || "");
  const dispatch = useDispatch();

  const progress = Number(
    (
      (lesson.completedExercises.length / lesson.exercises.length) *
      100
    ).toFixed(),
  );

  const handleClose = () => {
    logEvent(`web_${profile?.level}_[{${lesson.category}]_hide`);
    dispatch(resetActiveCourse());
  };

  return (
    <Box className={`${className} ${styles.gameWrapper}`}>
      <AutoHeightWrapper
        withoutPadding
        fullWidth
        backgroundType={backgroundType}
      >
        <HeaderCard
          progress={progress}
          handleClose={handleClose}
          title={courseType}
          description={description}
          titleIcon={courseIcon}
        />
        <Box className={styles.wrapper}>{children}</Box>
      </AutoHeightWrapper>
    </Box>
  );
};
