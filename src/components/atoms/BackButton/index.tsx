import { FC } from "react";
import { Box } from "@mui/material";

import ArrowIcon from "@/assets/arrow-right.svg";

import styles from "./index.module.scss";

interface IProps {
  onClick?: () => void;
  position?: "right" | "left";
}

const BackButton: FC<IProps> = ({ onClick = () => {}, position = "left" }) => {
  return (
    <Box
      className={styles.button}
      onClick={onClick}
      style={{
        transform: `rotate(${position === "right" ? "180deg" : "0deg"})`,
      }}
    >
      <ArrowIcon />
    </Box>
  );
};

export default BackButton;
