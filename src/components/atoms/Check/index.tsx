import { FC } from "react";

import { Box } from "@mui/material";

import CheckIcon from "@/assets/check.svg";

import styles from "./index.module.scss";

interface IProps {
  isActive: boolean;
  size?: string;
  activeColor?: string;
}

const Check: FC<IProps> = ({
  isActive,
  size = "32px",
  activeColor = "#27AE60",
}) => {
  return (
    <Box
      className={styles.optionCheckbox}
      sx={{
        border: isActive ? "none" : "1px solid #CDD2D9",
        background: isActive ? activeColor : "#fff",
        width: size,
        height: size,
      }}
    >
      <Box
        sx={{
          display: isActive ? "block" : "none",
        }}
      >
        <CheckIcon />
      </Box>
    </Box>
  );
};

export default Check;
