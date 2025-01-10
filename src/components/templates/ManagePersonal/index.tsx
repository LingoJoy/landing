import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import CardWrapper from "@/components/organisms/CardWrapper";
import BackButton from "@/components/atoms/BackButton";
import CustomDivider from "@/components/atoms/CustomDivider";
import TextList from "@/components/molecules/List";

import Trash from "@/assets/trash.svg";
import Broom from "@/assets/broom.svg";

import { ERoutes } from "@/constants/pages";
import { getLocalization } from "@/store/localization";
import { ELocalization } from "@/constants";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

const DEFAULT_DELETE_OPTIONS = [
  ELocalization.PROFILE_MANAGE_DELETE_1,
  ELocalization.PROFILE_MANAGE_DELETE_2,
];
const DEFAULT_PURCHASES_OPTIONS = [
  ELocalization.PROFILE_MANAGE_PURCHASES_1,
  ELocalization.PROFILE_MANAGE_PURCHASES_2,
  ELocalization.PROFILE_MANAGE_PURCHASES_3,
];

export const ManagePersonalTemplate: React.FC = () => {
  const navigate = useNavigate();

  const localization = useSelector(getLocalization);

  const handleSubmit = async () => {
    try {
      console.log("Clean");
      logEvent(`web_personal_info_on_close`);
      navigate(ERoutes.PROFILE);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    logEvent(`web_personal_info_on_close`);
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
                  {localization[ELocalization.PROFILE_PERSONAL_INFO]}
                </Typography>
              </Box>
            </ContentWrapper>
          </Box>
          <Box className={styles.webDivider}>
            <CustomDivider />
          </Box>
          <Box className={styles.webWrapper}>
            <ContentWrapper>
              <Box className={styles.listWrapper}>
                <Trash />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "1.125rem",
                      fontWeight: 500,
                      mb: "10px",
                    }}
                  >
                    {localization[ELocalization.PROFILE_DELETE_DATA]}
                  </Typography>
                  <TextList
                    data={DEFAULT_DELETE_OPTIONS.map((el) => localization[el])}
                  />
                </Box>
              </Box>
              <Box className={styles.listWrapper}>
                <Broom />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "1.125rem",
                      fontWeight: 500,
                      mb: "10px",
                    }}
                  >
                    {localization[ELocalization.PROFILE_MANAGE_PURCHASES_TITLE]}
                  </Typography>
                  <TextList
                    data={DEFAULT_PURCHASES_OPTIONS.map(
                      (el) => localization[el],
                    )}
                  />
                </Box>
              </Box>
              <Box className={styles.importantWrapper}>
                <Typography
                  sx={{
                    fontSize: "1.125rem",
                    lineHeight: "1.5rem",
                    fontWeight: 500,
                    mb: "6px",
                  }}
                >
                  {localization[ELocalization.IMPORTANT]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                  }}
                >
                  {localization[ELocalization.PROFILE_PERSONAL_SUBSCRIPTIONS]}{" "}
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                      color: "#3F97FF",
                      cursor: "pointer",
                    }}
                    component="span"
                  >
                    {localization[ELocalization.PROFILE_CLICK_TO_LEARN]}
                  </Typography>
                  .
                </Typography>
              </Box>
              <Button
                sx={{
                  width: "100%",
                  color: "#6E6E6E",
                  background: "#D8E2F1",
                }}
                onClick={handleSubmit}
              >
                {localization[ELocalization.DELETE_DATA]}
              </Button>
            </ContentWrapper>
          </Box>
        </Box>
      </CardWrapper>
    </Box>
  );
};
