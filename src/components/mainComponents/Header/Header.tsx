import { FC, ReactNode } from "react";

import Button from "../Button/Button";
import Logo from "../../icons/Logo";

import styles from "./index.module.css";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

const Header: FC<IProps> = ({ children, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Logo />
      </div>
      <div className={styles.box}>
        {children}
        <div className={styles.buttonWrapper}>
          <Button onClick={onClick} height="44px">
            Get it now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
