import { FC, ReactNode, useEffect, useState } from "react";

import { Box } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  children: ReactNode;
  background?: string;
}

const MainContainer: FC<IProps> = ({ children, background = "#fff" }) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const windowHeight = window.innerHeight;
    setHeight(windowHeight);
  }, []);

  return (
    <Box className={styles.wrapper} style={{ height, background }}>
      {children}
    </Box>
  );
};

export default MainContainer;
