import { FC, ReactNode } from "react";
import styles from "./index.module.css";

interface IProps {
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  height?: string;
}

const Button: FC<IProps> = ({
  onClick = () => {},
  disabled,
  children,
  height = "50px",
}) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
      style={{ height }}
    >
      {children}
    </button>
  );
};

export default Button;
