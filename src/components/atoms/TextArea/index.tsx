import { FC, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

import styles from "./index.module.scss";

interface IProps {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  value?: string;
  error?: ReactNode;
  placeholder?: string;
  className?: string;
}

const TextArea: FC<IProps> = ({
  error,
  onChange = () => {},
  onBlur = () => {},
  value,
  placeholder,
  className,
}) => {
  return (
    <Box className={styles.inputWrapper}>
      <Box
        className={styles.positionWrapper}
        style={{ borderColor: error ? "#EB575733" : "#eef3f9" }}
      >
        <textarea
          className={`${styles.input} ${className}`}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={(e) => onBlur(e.currentTarget.value)}
          placeholder={placeholder}
          style={{
            borderColor: error ? "red" : "#a4abb6",
          }}
        />
      </Box>
      {error && (
        <Typography
          sx={{ fontSize: "0.563rem", lineHeight: "0.688rem" }}
          className={styles.errorMessage}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default TextArea;
