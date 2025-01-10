import { FC, ReactNode } from "react";

import { Box } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  children: ReactNode;
}

const ContentContainer: FC<IProps> = ({ children }) => {
  return <Box className={styles.contentWrapper}>{children}</Box>;
};

export default ContentContainer;
