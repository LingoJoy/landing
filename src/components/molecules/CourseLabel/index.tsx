import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import Timer from "@/assets/timer.svg";
import Done from "@/assets/done.svg";

import { ELocalization, ETranslate } from "@/constants";
import {
  renderIconCourseTitle,
  renderIconCourseType,
} from "@/utils/courseHelpers";
import { getLocalization } from "@/store/localization";
import { getProfile } from "@/store/profile";

import { Course, CourseType } from "@/types";

import styles from "./index.module.scss";

interface ICourseLabel {
  onClick: () => void;
  backgroundColor: string;
  isFinished: boolean;
  imageURL: string;
  course: Course;
}

const CourseLabel: React.FC<ICourseLabel> = ({
  onClick,
  backgroundColor,
  isFinished,
  imageURL,
  course,
}) => {
  const localization = useSelector(getLocalization);
  const profile = useSelector(getProfile);

  const title =
    course.type === CourseType.Reading
      ? course.name
      : course.title?.[profile?.locale || ETranslate.ENGLISH];
  const descr =
    course.type === CourseType.Reading
      ? course.author
      : course.desc?.[profile?.locale || ETranslate.ENGLISH];

  return (
    <Box
      onClick={onClick}
      className={styles.wrapper}
      sx={{ background: backgroundColor }}
    >
      <Box className={styles.content}>
        <Typography className={styles.type}>
          {localization[renderIconCourseTitle(course.type)]}
          {renderIconCourseType(course.type)}
        </Typography>
        <Box className={styles.textWrapper}>
          <Typography>{title}</Typography>
          <Typography>{descr}</Typography>
        </Box>
        <Box className={styles.remainingTime}>
          {isFinished ? <Timer /> : <Done />}
          <Typography>
            {isFinished
              ? localization[ELocalization.FINISHED]
              : localization[ELocalization.FIVE_MINUTES]}
          </Typography>
        </Box>
      </Box>
      {imageURL && <img className={styles.cardImg} src={imageURL} />}
    </Box>
  );
};

export default CourseLabel;
