import React from "react";

import { Box } from "@mui/material";

import Comment from "@/assets/comment.svg";

import styles from "./index.module.scss";

interface IProps {
  image: React.ReactNode;
  content: React.ReactNode;
  classWrapper?: string;
}

const CommentCard: React.FC<IProps> = ({ image, content, classWrapper }) => {
  return (
    <Box className={`${styles.cardWrapper} ${classWrapper}`}>
      <Box className={styles.cardCommentImg}>
        <Comment />
      </Box>
      {image}
      <Box className={styles.cardContent}>{content}</Box>
    </Box>
  );
};

export default CommentCard;
