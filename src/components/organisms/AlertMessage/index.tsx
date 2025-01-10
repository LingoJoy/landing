import React, { createContext, useContext, useState, ReactNode } from "react";
import { Alert, IconButton, Typography } from "@mui/material";
import Like from "@/assets/like.svg";
import Teacher from "@/assets/teacher.svg";
import Close from "@/assets/close.svg";
import styles from "./index.module.scss";

interface AlertMessageProps {
  isCorrect: boolean | null;
  message: string;
}

interface AlertContextProps {
  showAlert: (isCorrect: boolean, message: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertMessageProps | null>(null);

  const showAlert = (isCorrect: boolean, message: string) => {
    setAlert({ isCorrect, message });

    setTimeout(() => {
      hideAlert();
    }, 3000);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && (
        <div className={styles.alertWrapper}>
          <Alert
            sx={{
              borderRadius: "20px",
              "& .MuiAlert-action": {
                m: 0,
                mr: 1,
              },
            }}
            severity={alert.isCorrect ? "success" : "warning"}
            icon={alert.isCorrect ? <Like /> : <Teacher />}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={hideAlert}
              >
                <Close />
              </IconButton>
            }
          >
            <Typography variant="subtitle2">{alert.message}</Typography>
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
};
