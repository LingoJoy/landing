import { FC, ReactNode, useEffect, useState } from "react";

import styles from "./index.module.css";

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
    <div className={styles.wrapper} style={{ height, background }}>
      {children}
    </div>
  );
};

export default MainContainer;
