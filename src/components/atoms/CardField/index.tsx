import React from "react";

import { Box } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  size?: "small" | "normal";
  height?: string;
}

const CardField: React.FC<IProps> = ({ size = "normal", height = "40px" }) => {
  return (
    <Box className={`${styles.cardField} ${styles[size]}`} style={{ height }} />
  );
};

export default CardField;
