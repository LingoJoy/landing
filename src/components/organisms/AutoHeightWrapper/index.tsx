import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";

import useWindowSize from "@/hooks/main/useWindowSize";

import styles from "./index.module.scss";

interface IProps {
  children: React.ReactNode;
  backgroundType?: number;
  withoutPadding?: boolean;
  fullWidth?: boolean;
}

const AutoHeightWrapper: React.FC<IProps> = ({
  children,
  backgroundType = 1,
  withoutPadding,
  fullWidth,
}) => {
  const [height, setHeight] = useState(0);

  const { height: innerHeight } = useWindowSize();

  useEffect(() => {
    setHeight(innerHeight);
  }, [innerHeight]);

  const customStyles = withoutPadding ? { padding: 0 } : {};

  return (
    <>
      <Box
        className={`${styles.background} ${
          styles[`background-${backgroundType}`]
        }`}
      />
      <Box
        className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ""}`}
        style={{ height, ...customStyles }}
      >
        {children}
      </Box>
    </>
  );
};

export default AutoHeightWrapper;
