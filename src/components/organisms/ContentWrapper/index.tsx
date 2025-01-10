import React from "react";

import { Box } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  contentClass?: string;
  children: React.ReactNode;
}

const ContentWrapper: React.FC<IProps> = ({ children, contentClass }) => {
  return <Box className={`${styles.container} ${contentClass || ''}`}>{children}</Box>;
};

export default ContentWrapper;
