import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import {
  DEFAULT_PREMIUM_HIGHLIGHTS_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const HighlightsSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.highlightsWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.titleWrapper}>
          <h2 className={styles.title}>
            {
              localization[
                ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_TITLE
              ]
            }
          </h2>
        </Box>
        <Box className={styles.highlightsBox}>
          {DEFAULT_PREMIUM_HIGHLIGHTS_DATA.map((el, i) => (
            <Box className={styles.yourPlanGoalOptionBox} key={i}>
              {el.icon}
              <Box>
                <p>{localization[el.title]}</p>
                <h4>{localization[el.description]}</h4>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HighlightsSection;
