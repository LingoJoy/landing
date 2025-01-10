import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";

import { Layout } from "../Layout";
import ContentWrapper from "@/components/organisms/ContentWrapper";
import Modal from "@/components/atoms/Modal";

import { DEFAULT_NOTIFICATIONS } from "@/constants/data/profile.data";
import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";

import styles from "./index.module.scss";

export const NotificationTemplate: React.FC = () => {
  const navigate = useNavigate();

  const isNotMobile = useMediaQuery("(min-width:600px)");

  const localization = useSelector(getLocalization);

  return (
    <Layout withoutPadding isSimpleType>
      <Box className={styles.wrapper} data-class="NotificationTemplate">
        <Modal
          isOpen={true}
          button={<></>}
          onClose={!isNotMobile ? () => navigate(-1) : undefined}
          cardClass={styles.card}
          customBackgroundClass={styles.modalBackground}
          zIndex="1100"
        >
          <ContentWrapper>
            <Box className={styles.modalHeader}>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  lineHeight: "1.375rem",
                  fontWeight: 500,
                  color: "#333333",
                }}
              >
                {localization[ELocalization.NOTIFICATIONS]} ({DEFAULT_NOTIFICATIONS?.length})
              </Typography>
            </Box>
          </ContentWrapper>
          <Divider />
          <Box className={styles.webWrapper}>
            {DEFAULT_NOTIFICATIONS.map((el) => (
              <Box
                key={el.id}
                className={`${styles.optionWrapper} ${
                  el.active ? styles.activeOption : ""
                }`}
              >
                <Box className={`${styles.optionBox}`}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    {el.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.125rem",
                    }}
                  >
                    {el.subTitle}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Modal>
      </Box>
    </Layout>
  );
};
