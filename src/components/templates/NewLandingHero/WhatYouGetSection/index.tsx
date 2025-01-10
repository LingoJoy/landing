import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import {
  DEFAULT_NEW_WHAT_YOU_GET_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const WhatYouGetSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.whatYouGetWrapper}>
      <Box className={`${styles.contentBox} ${styles.webMaxContentBox}`}>
        <Box className={styles.titleWrapper}>
          <h2 className={styles.title}>
            {
              localization[
                ELocalizationQuestionnaire.LANDING_WHAT_YOU_GET_TITLE
              ]
            }
          </h2>
        </Box>
        <Box className={styles.whatYouGetBox}>
          {DEFAULT_NEW_WHAT_YOU_GET_DATA.map((el, i) => (
            <Box className={styles.whatYouGetOptionWrapper} key={`What-${i}`}>
              <img src={el.img} alt="" />
              <Box className={styles.whatYouGetOption}>
                <h6>{localization[el.title]}</h6>
                <p>{localization[el.descr]}</p>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WhatYouGetSection;
