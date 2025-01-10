import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import CardWrapper from "@/components/organisms/CardWrapper";
import BackButton from "@/components/atoms/BackButton";
import CustomDivider from "@/components/atoms/CustomDivider";
import TextList from "@/components/molecules/List";

import { ERoutes } from "@/constants/pages";
import { ELocalization } from "@/constants/localization";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

const DEFAULT_REQUIRED_OPTIONS = [
  ELocalization.PROFILE_MANAGE_REQUIRED_1,
  ELocalization.PROFILE_MANAGE_REQUIRED_2,
  ELocalization.PROFILE_MANAGE_REQUIRED_3,
  ELocalization.PROFILE_MANAGE_REQUIRED_4,
];

export const TermsTemplate: React.FC = () => {
  const navigate = useNavigate();

  const localization = useSelector(getLocalization);

  const handleClose = () => {
    logEvent(`web_terms_policies_on_close`);
    navigate(ERoutes.PROFILE);
  };

  return (
    <Box className={styles.wrapper}>
      <CardWrapper
        customStyle={{
          padding: 0,
        }}
      >
        <Box>
          <Box className={styles.webWrapper}>
            <ContentWrapper>
              <Box className={styles.headerWrapper}>
                <Box className={styles.headerBack}>
                  <BackButton position="right" onClick={handleClose} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    lineHeight: "1.125rem",
                    fontWeight: 500,
                    color: "#333333",
                  }}
                >
                  {localization[ELocalization.PROFILE_GENERAL_TERMS]}
                </Typography>
              </Box>
            </ContentWrapper>
          </Box>
          <Box className={styles.webDivider}>
            <CustomDivider />
          </Box>
          <Box className={styles.webWrapper}>
            <ContentWrapper>
              <Box className={styles.contentWrapper}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.125rem",
                    fontWeight: 500,
                    mt: "24px",
                  }}
                >
                  {localization[ELocalization.PROFILE_AGREEMENT_TITLE]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: "1.125rem",
                    my: "8px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {localization[ELocalization.PROFILE_AGREEMENT_TEXT]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.125rem",
                    fontWeight: 500,
                    mt: "24px",
                  }}
                >
                  {localization[ELocalization.PROFILE_REQUIRED_TITLE]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    lineHeight: "1.125rem",
                    my: "8px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {localization[ELocalization.PROFILE_REQUIRED_TEXT]}
                </Typography>
                <TextList
                  data={DEFAULT_REQUIRED_OPTIONS.map((el) => localization[el])}
                  textStyle={{ fontSize: "0.75rem" }}
                />
              </Box>
            </ContentWrapper>
          </Box>
        </Box>
      </CardWrapper>
    </Box>
  );
};
