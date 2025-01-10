import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import AnalyzeOption from "@/components/molecules/AnalyzeOption";

import BoxImage from "@/assets/main/box.png";

import { DEFAULT_PLAN_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const PlanSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.planWrapper} data-class="NewLandingHero-PlanSection">
      <Box className={styles.contentBox}>
        <Box className={styles.titleWrapper}>
          <img src={BoxImage} alt="" />
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
        </Box>
      </Box>
    </Box>
  );
};

export default PlanSection;
