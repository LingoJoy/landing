import { FC, HTMLInputTypeAttribute, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

import KeyImage from "@/assets/key.svg";
import PersonImage from "@/assets/person.svg";
import SMSImage from "@/assets/sms.svg";

import styles from "./index.module.scss";

interface IProps {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  value?: string;
  error?: ReactNode;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

const Field: FC<IProps> = ({
  error,
  onChange = () => {},
  onBlur = () => {},
  value,
  type,
  placeholder,
}) => {
  return (
    <Box className={styles.inputWrapper}>
      <Box
        className={styles.positionWrapper}
        style={{ borderColor: error ? "#EB575733" : "#eef3f9" }}
      >
        {type === "email" && (
          <Box className={styles.beforeIcon}>
            <SMSImage />
          </Box>
        )}
        {type === "password" && (
          <Box className={styles.beforeIcon}>
            <KeyImage />
          </Box>
        )}
        {type === "name" && (
          <Box className={styles.beforeIcon}>
            <PersonImage />
          </Box>
        )}
        <input
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={(e) => onBlur(e.currentTarget.value)}
          type={type}
          placeholder={placeholder}
          style={{
            paddingLeft:
              type === "email" || type === "password" || type === "name"
                ? "39px"
                : "15px",
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

export default Field;
