import React from "react";
import { Box } from "@mui/material";

import styles from "./index.module.scss";
import ColorCommentIcon from "@/components/atoms/icons/ColorCommentIcon";

type TWordsCommentType = "now" | "plan";

interface IProps {
  title: string;
  words: number;
  type?: TWordsCommentType;
}

const WordsComment: React.FC<IProps> = ({ title, words, type = "now" }) => {
  return (
    <Box className={styles.wrapper}>
      <Box className={styles.bgWrapper}>
        <ColorCommentIcon color={type === "plan" ? "#3F97FF" : "#27AE60"} />
      </Box>
      <Box className={`${styles.content} ${styles[type]}`}>
        <p className={styles.title}>{title}</p>
        <p className={styles.words}>
          {words === 1 ? "1 word" : `${words.toLocaleString("en")} words`}
        </p>
      </Box>
    </Box>
  );
};

export default WordsComment;
