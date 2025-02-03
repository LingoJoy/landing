import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import AnalyzeOption from "@/components/molecules/AnalyzeOption";

import { DEFAULT_PLAN_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const PlanSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.planWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.titleWrapper}>
          <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}box.png`} alt="" />
          <h2 className={`${styles.title} ${styles.planTitle}`}>
            {localization[ELocalizationQuestionnaire.LANDING_PLAN_TITLE]}
          </h2>
        </Box>
        <Box className={styles.planOptionWrapper}>
          <Box className={styles.analyzeOptionWrapper}>
            {DEFAULT_PLAN_DATA.map((el) => {
              return (
                <Box key={el.id} className={styles.analyzeOption}>
                  <AnalyzeOption
                    finished
                    text={localization[el.title]}
                    active={false}
                  />
                </Box>
              );
            })}
          </Box>
          <Button
            onClick={() => {
              window.location.href = "#plan";
            }}
            sx={{ width: "100%" }}
          >
            {localization[ELocalizationQuestionnaire.LANDING_HEADER_BTN]}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanSection;
