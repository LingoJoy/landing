import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Swipe from "@/components/organisms/Swipe";

import { DEFAULT_LESSON_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const LessonsSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.lessonsWrapper}>
      <Box className={styles.titleWrapper}>
        <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}iphone.png`} alt="" />
        <h2 className={`${styles.title} ${styles.lessonTitle}`}>
          {localization[ELocalizationQuestionnaire.LANDING_LESSON_TITLE]}
        </h2>
      </Box>
      <Box className={styles.lessonsBox}>
        <Swipe
          data={DEFAULT_LESSON_DATA.map((el) => (
            <img src={el} alt="" />
          ))}
        />
      </Box>
      <Box className={styles.lessonsWebBox}>
        {DEFAULT_LESSON_DATA.map((el) => (
          <img src={el} alt="" key={el} />
        ))}
      </Box>
    </Box>
  );
};

export default LessonsSection;
