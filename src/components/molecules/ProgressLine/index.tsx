import React from "react";

import { Box } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  progress: number;
}

const getProgressPosition = (progress: number) => {
  if (progress < 5) return "5%";
  if (progress > 95) return "95%";
  return `${progress}%`;
};

const ProgressLine: React.FC<IProps> = ({ progress }) => {
  return (
    <Box className={styles.headerProgressWrapper}>
      <Box className={styles.progressLine} />
      <Box
        className={styles.progressActiveLine}
        style={{
          width: `${progress}%`,
          borderTopRightRadius: progress < 100 ? "10px" : "none",
          borderBottomRightRadius: progress < 100 ? "10px" : "none",
        }}
      />
      <Box
        className={styles.counterProgressBox}
        style={{
          left: getProgressPosition(progress),
        }}
      >
        <Box className={styles.counterProgressTriangle} />
        <span>{progress}%</span>
      </Box>
    </Box>
  );
};

export default ProgressLine;
