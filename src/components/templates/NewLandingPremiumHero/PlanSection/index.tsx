import { Box } from "@mui/material";
import { useSelector } from "react-redux";


import { DEFAULT_LANDING_PREMIUM_LIST, ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import LogoIcon from "../../../atoms/icons/LogoIcon";
import AnalyzeLandingOption from "../../../molecules/AnalyzeLandingOption";
import styles from "../index.module.scss";

const PlanSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.planWrapper} data-class="NewLandingHero-PlanSection">
      <Box className={styles.contentBox}>
        <Box className={styles.titleWrapper}>
        <LogoIcon />
          <h2 className={`${styles.title} ${styles.planTitle}`}>
          {localization[ELocalizationQuestionnaire.UNLIMITED_ACCESS]}
          </h2>
          <h2 className={`${styles.description} ${styles.planTitle}`}>
            {localization[ELocalizationQuestionnaire.NEW_PREMIUM_LANDING_HEADER_DESC]}
          </h2>
        </Box>
        <Box className={styles.planOptionWrapper}>
          <Box className={styles.analyzeOptionWrapper}>
            {DEFAULT_LANDING_PREMIUM_LIST.map((el) => {
              return (
                <Box key={el.id} className={styles.analyzeOption}>
                  <AnalyzeLandingOption
                    emoji={el.icon}
                    text={localization[el.title]}
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
