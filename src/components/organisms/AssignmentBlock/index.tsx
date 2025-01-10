import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import Calendar from "@/assets/main/calendar.png";

import { ELocalization, ETranslate } from "@/constants";
import {
  renderIconCourseTitle,
  renderIconCourseType,
} from "@/utils/courseHelpers";
import { getLocalization } from "@/store/localization";
import { useHorizontalScroll } from "@/hooks/main/useHorizontalScroll";
import { getProfile } from "@/store/profile";

import { Course } from "@/types";

import styles from "./index.module.scss";

interface IProps {
  data: Course[];
  onStart: (
    courseId: string,
    courseType: string,
    gameFinished: boolean,
    category: string,
    title: string,
  ) => Promise<void>;
}

const AssignmentBlock: React.FC<IProps> = ({ data, onStart }) => {
  const localization = useSelector(getLocalization);
  const profile = useSelector(getProfile);

  const scrollRef = useHorizontalScroll();

  return (
    <Box className={styles.content}>
      <Box className={styles.titleBox}>
        <Typography variant="body1" className={styles.title}>
          {localization[ELocalization.ASSIGNMENT_TITLE]}
        </Typography>
        <img src={Calendar} alt="" className={styles.titleIcon} />
      </Box>

      <Box className={styles.carouselContainer} ref={scrollRef}>
        {data.map((course, index) => (
          <Box
            key={index}
            className={styles.card}
            onClick={() =>
              onStart(
                course?.lesson?._id,
                course.type,
                false,
                course.category,
                course.title[profile?.locale || ETranslate.ENGLISH],
              )
            }
          >
            <Typography
              display="flex"
              alignItems="center"
              sx={{ p: 1 }}
              variant="cardHeader"
            >
              {localization[renderIconCourseTitle(course.type)]}
              {renderIconCourseType(course.type)}
            </Typography>
            <Typography sx={{ p: 1 }} variant="cardSubtitle">
              {course.title[profile?.locale || ETranslate.ENGLISH]}
            </Typography>
            <Typography
              sx={{ p: 1, pt: 0 }}
              className={styles.text}
              variant="cardText"
            >
              {course.desc?.[profile?.locale || ETranslate.ENGLISH]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AssignmentBlock;
