import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

import CheckIcon from "@/components/atoms/icons/CheckIcon";

import styles from "./index.module.scss";

interface IOptionProps {
  finished: boolean;
  active: boolean;
  text: ReactNode;
}

const AnalyzeOption: FC<IOptionProps> = ({ finished, active, text }) => {
  const getIconBorderColor = () => {
    if (finished) return "#27AE60";
    if (active) return "#CDD2D9";
    return "transparent";
  };

  return (
    <Box className={styles.optionWrapper}>
      <CheckIcon
        color={getIconBorderColor()}
        checkColor={finished ? "#27AE60" : "transparent"}
      />
      <p
        className={styles.optionText}
        style={{ fontWeight: active && !finished ? 600 : 400 }}
      >
        {text}
      </p>
    </Box>
  );
};

export default AnalyzeOption;
