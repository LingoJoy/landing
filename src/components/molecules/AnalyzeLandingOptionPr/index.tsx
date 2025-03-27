import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import styles from "./index.module.scss";

interface IOptionProps {
  emoji: ReactNode;
  text: ReactNode;
}

const AnalyzeLandingOptionPr: FC<IOptionProps> = ({ emoji, text }) => {
  return (
    <Box className={styles.optionWrapper}>
       <p
        className={styles.optionText}
      >
        {emoji}
      </p>
      <p
        className={styles.optionText}
      >
        {text}
      </p>
    </Box>
  );
};

export default AnalyzeLandingOptionPr;
