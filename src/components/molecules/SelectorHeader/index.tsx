import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import BackButton from "@/components/atoms/BackButton";
import ProgressQuestionLine from "@/components/molecules/ProgressQuestionLine";
import LogoIcon from "@/components/atoms/icons/LogoIcon";

import { getQuestionnaire } from "@/store/questionnaire";

import styles from "./index.module.scss";

interface IProps {
  title: ReactNode;
  progressTitle: ReactNode;
  onBack: () => void;
}

const MAX_SELECTOR_STEPS = 17;

const SelectorHeader: FC<IProps> = ({ title, progressTitle, onBack }) => {
  const state = useSelector(getQuestionnaire);

  const progress = (state.step / MAX_SELECTOR_STEPS) * 100;

  return (
    <Box className={styles.headerWrapper}>
      <Box className={styles.logoWrapper}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.webWrapper}>
        <Box className={styles.statusWrapper}>
          <Box className={styles.backWrapper}>
            <BackButton onClick={onBack} position="right" />
          </Box>
          <Box className={styles.progressWrapper}>
            <p className={styles.progressTitle}>{progressTitle}</p>
            <Box className={styles.progressLineWrapper}>
              <ProgressQuestionLine progress={progress} />
            </Box>
          </Box>
        </Box>
        <h2 className={styles.title}>{title}</h2>
      </Box>
    </Box>
  );
};

export default SelectorHeader;
