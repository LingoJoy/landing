import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import {
  DEFAULT_NEW_LESSON_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { useHorizontalScroll } from "@/hooks/main/useHorizontalScroll";

import styles from "../index.module.scss";

const LessonsSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const scrollRef = useHorizontalScroll();

  return (
    <Box className={styles.lessonsWrapper}>
      <Box className={styles.titleWrapper}>
        <h2 className={`${styles.title} ${styles.lessonTitle}`}>
          {localization[ELocalizationQuestionnaire.NEW_LANDING_APP_TITLE]}
        </h2>
      </Box>
      <Box className={styles.filterCarousel}>
        <Box className={styles.carouselContainer} ref={scrollRef}>
          {DEFAULT_NEW_LESSON_DATA.map((el, i) => (
            <Box key={`Slide-${i}`} className={styles.carouselSlide}>
              <img src={el.img} alt="" />
              <p>{localization[el.title]}</p>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className={styles.scrollBox}>
        <Box
          className={styles.scrollTrack}
          sx={{
            left: `${
              ((scrollRef.current?.scrollLeft || 0) /
                ((scrollRef.current?.scrollWidth || 0) -
                  (scrollRef.current?.offsetWidth || 0))) *
              100
            }px`,
          }}
        />
      </Box>
    </Box>
  );
};

export default LessonsSection;
