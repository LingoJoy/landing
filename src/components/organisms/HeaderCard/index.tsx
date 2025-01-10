import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import ProgressLine from "@/components/molecules/ProgressLine";

import Union from "@/assets/Union.svg";

import styles from "./index.module.scss";

interface IProps {
  progress: number;
  handleClose: () => void;
  title: string;
  description: string;
  titleIcon: React.ReactNode;
}

const HeaderCard: React.FC<IProps> = ({
  progress,
  handleClose,
  title,
  description,
  titleIcon,
}) => {
  return (
    <Box className={styles.headerWrapper}>
      <ContentWrapper>
        <Box className={styles.headerContentWrapper}>
          <Box>
            <Box className={styles.headerTitleWrapper}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "0.625rem",
                  lineHeight: "1.25rem",
                  fontWeight: 700,
                }}
              >
                {title}
              </Typography>
              {titleIcon}
            </Box>
            <Typography sx={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}>
              {description}
            </Typography>
          </Box>
          <IconButton onClick={handleClose} className={styles.iconBtn}>
            <Union />
          </IconButton>
        </Box>
      </ContentWrapper>
      <Box className={styles.progressWrapper}>
        <ProgressLine progress={progress} />
      </Box>
    </Box>
  );
};

export default HeaderCard;
