import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Typography } from "@mui/material";

import { ProfileTemplate } from "@/components/templates";
import ContentWrapper from "@/components/organisms/ContentWrapper";
import Modal from "@/components/atoms/Modal";
import Field from "@/components/atoms/Field";
import TextArea from "@/components/atoms/TextArea";

import { ERoutes } from "@/constants/pages";
import { validateEmail, validateName } from "@/utils/validations";
import { ELocalization, EUrls } from "@/constants";
import { useAlert } from "@/components/organisms/AlertMessage";
import axios from "@/utils/AxiosConfig";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";
import { getProfile } from "@/store/profile";

import styles from "./index.module.scss";

interface IErrors {
  name: ELocalization | "";
  email: ELocalization | "";
  message: ELocalization | "";
}

export const ContactUsTemplate: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<IErrors>({
    name: "",
    email: "",
    message: "",
  });

  const localization = useSelector(getLocalization);
  const profile = useSelector(getProfile);

  const { showAlert } = useAlert();

  const navigate = useNavigate();

  const handleErrors = (value: Partial<IErrors>) => {
    setErrors({ ...errors, ...value });
  };

  const handleSubmit = async () => {
    if (!name) {
      return handleErrors({
        name: ELocalization.FIELD_REQUIRED,
      });
    } else
      handleErrors({
        name: "",
      });

    if (!email) {
      return handleErrors({
        email: ELocalization.FIELD_REQUIRED,
      });
    } else
      handleErrors({
        email: "",
      });

    if (!message) {
      return handleErrors({
        message: ELocalization.FIELD_REQUIRED,
      });
    } else
      handleErrors({
        message: "",
      });

    try {
      axios.post(EUrls.CONTACT_US, { name, email, msg: message });

      setName("");
      setEmail("");
      setMessage("");

      showAlert(true, localization[ELocalization.SENDED]);
      logEvent(`web_profile_${profile?.level}_contact_us_on_send`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    logEvent(`web_profile_${profile?.level}_contact_us_on_close`);
    navigate(ERoutes.PROFILE);
  };

  return (
    <Box className={styles.wrapper}>
      <ProfileTemplate />
      <Modal
        isOpen={true}
        onClose={handleClose}
        button={
          <Box className={styles.webWrapper}>
            <Button sx={{ width: "100%" }} onClick={handleSubmit}>
              {localization[ELocalization.SEND_MESSAGE]}
            </Button>
          </Box>
        }
        cardClass={styles.card}
      >
        <ContentWrapper>
          <Box className={styles.modalHeader}>
            <Typography
              sx={{
                fontSize: "1.125rem",
                lineHeight: "1.25rem",
                fontWeight: 500,
              }}
            >
              {localization[ELocalization.PROFILE_GENERAL_CONTACT]}
            </Typography>
          </Box>
        </ContentWrapper>
        <Divider />
        <ContentWrapper>
          <Box className={styles.modalContent}>
            <Box className={styles.webWrapper}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  lineHeight: "1.25rem",
                  fontWeight: 500,
                  mb: "8px",
                }}
              >
                {localization[ELocalization.PROFILE_TERMS_TITLE]}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  mb: "26px",
                }}
              >
                {localization[ELocalization.PROFILE_TERMS_TEXT]}
              </Typography>
              <Box className={styles.fieldWrapper}>
                <Field
                  type="name"
                  value={name}
                  onChange={setName}
                  placeholder={localization[ELocalization.ENTER_NAME]}
                  error={errors.name ? localization[errors.name] : ""}
                  onBlur={(name) => {
                    if (validateName(name)) {
                      handleErrors({
                        name: validateName(name),
                      });
                    } else handleErrors({ name: "" });
                  }}
                />
              </Box>
              <Box className={styles.fieldWrapper}>
                <Field
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder={localization[ELocalization.ENTER_EMAIL_ADDRESS]}
                  error={errors.email ? localization[errors.email] : ""}
                  onBlur={(email) => {
                    if (validateEmail(email)) {
                      handleErrors({
                        email: validateEmail(email),
                      });
                    } else handleErrors({ email: "" });
                  }}
                />
              </Box>
              <TextArea
                value={message}
                onChange={setMessage}
                placeholder={localization[ELocalization.ENTER_MESSAGE]}
                error={errors.message ? localization[errors.message] : ""}
                className={styles.textarea}
              />
            </Box>
          </Box>
        </ContentWrapper>
      </Modal>
    </Box>
  );
};
