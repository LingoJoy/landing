import React from "react";

import { Box, Typography } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  title: string;
  active?: boolean;
  isCorrect?: boolean | null;
  isError?: boolean;
}

const WordOption: React.FC<IProps> = ({
  title,
  active,
  isCorrect,
  isError,
}) => {
  return (
    <Box
      className={`${styles.wordOption} ${
        active ? styles.wordOptionActive : ""
      } ${isCorrect ? styles.wordOptionCorrect : ""} ${
        isError ? styles.wordOptionError : ""
      }`}
    >
      <Typography sx={{ fontSize: "1rem", lineHeight: "1.25rem" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default WordOption;
