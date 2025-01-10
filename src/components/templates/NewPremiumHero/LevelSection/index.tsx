import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import StarIcon from "@/components/atoms/icons/StarIcon";

import ArrowIcon from "@/assets/new-premium/icons/chevron.svg";
import StarsImage from "@/assets/new-premium/stars-linear.png";
import BeginnerImage from "@/assets/new-premium/beginner.png";
import NativeImage from "@/assets/new-premium/native.png";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import useWindowSize from "@/hooks/main/useWindowSize";

import styles from "../index.module.scss";

const LevelSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const [height, setHeight] = useState(666);

  const { height: innerHeight } = useWindowSize();

  useEffect(() => {
    setHeight(innerHeight);
  }, [innerHeight]);

  return (
    <Box className={styles.levelWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.levelBox}>
          <Box className={styles.levelTopBox}>
            <Box className={styles.levelBefore}>
              {localization[ELocalizationQuestionnaire.NEW_PREMIUM_BEFORE]}
            </Box>
            <Box className={styles.levelAfter}>
              {localization[ELocalizationQuestionnaire.NEW_PREMIUM_AFTER]}
            </Box>
          </Box>
          <Box
            className={styles.levelBodyBox}
            sx={{ height: `${height * 0.4}px` }}
          >
            <Box className={styles.levelBeginnerBox}>
              <Box className={styles.levelImageBox}>
                <img src={BeginnerImage} alt="" />
                <p>
                  300 {localization[ELocalizationQuestionnaire.LANDING_WORDS]}
                </p>
              </Box>
            </Box>
            <Box className={styles.levelNativeBox}>
              <Box className={styles.levelImageBox}>
                <img src={NativeImage} alt="" />
                <p>
                  3,000 {localization[ELocalizationQuestionnaire.LANDING_WORDS]}
                </p>
              </Box>
            </Box>
            <Box className={styles.arrowsBox}>
              <ArrowIcon />
              <ArrowIcon />
              <ArrowIcon />
            </Box>
          </Box>
          <Box className={styles.levelBottomBox}>
            <Box
              className={`${styles.levelBottomOptionBox} ${styles.levelBeginner}`}
            >
              <h3>
                {
                  localization[
                    ELocalizationQuestionnaire.NEW_PREMIUM_YOUR_LEVEL
                  ]
                }
              </h3>
              <p>
                {
                  localization[
                    ELocalizationQuestionnaire.NEW_LANDING_CHART_BEGINNER
                  ]
                }
              </p>
              <Box className={styles.starsWrapper}>
                {new Array(5).fill(undefined).map((_, i) => {
                  return i === 0 ? (
                    <StarIcon size="16px" key={i} color="#EB5757" />
                  ) : (
                    <StarIcon size="16px" color="#EEF3F9" key={i} />
                  );
                })}
              </Box>
            </Box>
            <Box className={`${styles.levelBottomOptionBox}`}>
              <h3>
                {
                  localization[
                    ELocalizationQuestionnaire.NEW_PREMIUM_YOUR_LEVEL
                  ]
                }
              </h3>
              <p>
                {localization[ELocalizationQuestionnaire.NEW_PREMIUM_NATIVE]}
              </p>
              <img src={StarsImage} alt="" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LevelSection;
