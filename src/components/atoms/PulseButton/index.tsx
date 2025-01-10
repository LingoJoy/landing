import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import styles from "./index.module.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const PulseButton: FC<IProps> = ({
  onClick = () => {},
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default PulseButton;
