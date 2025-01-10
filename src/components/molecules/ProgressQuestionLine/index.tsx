import { FC } from "react";

import { Box } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  progress: number;
}

const ProgressQuestionLine: FC<IProps> = ({ progress }) => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.line} />
      <Box
        className={`${styles.line} ${styles.progressLine}`}
        style={{ width: `${progress}%` }}
      />
      <Box className={`${styles.circle} ${styles.activeCircle}`} />
      <Box
        className={`${styles.circle} ${
          progress >= 50 ? styles.activeCircle : ""
        }`}
      />
      <Box
        className={`${styles.circle} ${
          progress === 100 ? styles.activeCircle : ""
        }`}
      />
    </Box>
  );
};

export default ProgressQuestionLine;
