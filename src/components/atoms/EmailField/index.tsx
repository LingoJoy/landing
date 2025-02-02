import { Box, List, ListItem, ListItemButton, Typography } from "@mui/material";

import SMSImage from "@/assets/sms.svg";
import styles from "./index.module.scss";

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  error?: string;
  placeholder?: string;
  suggestions: string[];
  onSelectSuggestion: (value: string) => void;
}

const EmailField = ({
  value,
  onChange,
  onBlur = () => {},
  error,
  placeholder,
  suggestions,
  onSelectSuggestion,
}: EmailFieldProps) => {
  return (
    <Box className={styles.inputWrapper}>
      <Box
        className={styles.positionWrapper}
        style={{ borderColor: error ? "#EB575733" : "#eef3f9" }}
      >
        <Box className={styles.beforeIcon}>
          <SMSImage />
        </Box>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onBlur={(e) => onBlur(e.currentTarget.value)}
          type="email"
          placeholder={placeholder}
          style={{
            paddingLeft: "39px",
            borderColor: error ? "red" : "#a4abb6",
          }}
        />
      </Box>
      {suggestions.length > 0 && (
        <List className={styles.suggestionList}>
          {suggestions.map((suggestion, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => onSelectSuggestion(suggestion)}>
                {suggestion}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
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

export default EmailField;
