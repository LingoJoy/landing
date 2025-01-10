import React, { CSSProperties } from "react";

import { Box, SxProps } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  children: React.ReactNode;
  customStyle?: CSSProperties;
  className?: string;
  sxProp?: SxProps;
}

const CardWrapper: React.FC<IProps> = ({
  children,
  customStyle,
  className,
  sxProp,
}) => {
  return (
    <Box
      sx={sxProp}
      className={`${styles.container} ${className}`}
      style={customStyle}
    >
      {children}
    </Box>
  );
};

export default CardWrapper;
