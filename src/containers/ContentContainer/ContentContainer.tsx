import { FC, ReactNode } from "react";

import styles from "./index.module.css";

interface IProps {
  children: ReactNode;
}

const ContentContainer: FC<IProps> = ({ children }) => {
  return <div className={styles.contentWrapper}>{children}</div>;
};

export default ContentContainer;
