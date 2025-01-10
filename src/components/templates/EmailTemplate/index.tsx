import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import ContentWrapper from "@/components/organisms/ContentWrapper";
import CardWrapper from "@/components/organisms/CardWrapper";
import BackButton from "@/components/atoms/BackButton";
import Field from "@/components/atoms/Field";
import Modal from "@/components/atoms/Modal";

import { ERoutes } from "@/constants/pages";
import { validatePassword, validateEmail } from "@/utils/validations";
import { getProfile, setProfile } from "@/store/profile";
import { ELocalization } from "@/constants";
import { getLocalization } from "@/store/localization";

import styles from "./index.module.scss";

interface IErrors {
  code: ELocalization | "";
  email: ELocalization | "";
  password: ELocalization | "";
}

export const EmailTemplate: React.FC = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [errors, setErrors] = useState<IErrors>({
    code: "",
    email: "",
    password: "",
  });

  const profile = useSelector(getProfile);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const localization = useSelector(getLocalization);

  const handleErrors = (value: Partial<IErrors>) => {
    setErrors({ ...errors, ...value });
  };

  const handleSubmitCode = async () => {
    try {
      console.log(code);
      setStep(2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      // console.log({ email, password });
      setIsOpenModal(false);
      if (profile)
        dispatch(
          setProfile({
            ...profile,
            email,
          }),
        );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className={styles.wrapper}>
      <CardWrapper
        customStyle={{
          padding: 0,
        }}
      >
        <Box className={styles.webWrapper}>
          <ContentWrapper>
            <Box className={styles.headerWrapper}>
              <Box className={styles.headerBack}>
                <BackButton
                  position="right"
                  onClick={() => navigate(ERoutes.PROFILE)}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: "1.125rem",
                  lineHeight: "1.125rem",
                  fontWeight: 500,
                  color: "#333333",
                }}
              >
                {localization[ELocalization.PROFILE_EMAIL]}
              </Typography>
            </Box>

            <Field
              type="email"
              value={profile?.email || "mik**********yi@gmail.com"}
            />
            <Box className={styles.descriptionBox}>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                  color: "#6E6E6E",
                  pr: "2px",
                }}
                component="span"
              >
                {localization[ELocalization.PROFILE_CHANGE_EMAIL]}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                  color: "#3F97FF",
                  cursor: "pointer",
                }}
                component="span"
                onClick={() => setIsOpenModal(true)}
              >
                {localization[ELocalization.CLICK_HERE]}
              </Typography>
            </Box>
          </ContentWrapper>
        </Box>
      </CardWrapper>
      <Modal
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setStep(1);
        }}
        button={
          <Box className={styles.webWrapper}>
            <Button
              sx={{ width: "100%" }}
              onClick={() => {
                if (step === 1) return handleSubmitCode();
                handleSubmit();
              }}
            >
              {step === 1
                ? localization[ELocalization.NEXT]
                : localization[ELocalization.CHANGE_EMAIL]}
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
              {localization[ELocalization.CHANGE_EMAIL_ADDRESS]}
            </Typography>
          </Box>
        </ContentWrapper>
        <Divider />
        <Stack className={styles.modalBody}>
          <ContentWrapper>
            <Box className={styles.webWrapper}>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: "1rem",
                  fontWeight: 700,
                  color: "#6E6E6E",
                }}
              >
                {localization[ELocalization.STEP]} {step}{" "}
                {localization[ELocalization.OF]} 2
              </Typography>
              {step === 1 ? (
                <>
                  <Box className={styles.modalTextBox}>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        fontWeight: 500,
                        margin: "6px",
                      }}
                    >
                      {localization[ELocalization.CHECK_EMAIL]}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        lineHeight: "1.25rem",
                        marginBottom: "26px",
                      }}
                    >
                      {localization[ELocalization.PROFILE_WE_SEND_CODE]}
                    </Typography>
                  </Box>
                  <Field
                    value={code}
                    onChange={setCode}
                    placeholder={localization[ELocalization.ENTER_CODE]}
                  />
                </>
              ) : (
                <>
                  <Box className={styles.modalTextBox}>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        lineHeight: "1.5rem",
                        fontWeight: 500,
                        margin: "6px",
                      }}
                    >
                      {localization[ELocalization.ENTER_NEW_EMAIL]}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        lineHeight: "1.25rem",
                        marginBottom: "26px",
                      }}
                    >
                      {localization[ELocalization.PROFILE_UPDATE_EMAIL]}
                    </Typography>
                  </Box>
                  <Field
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder={
                      localization[ELocalization.PROFILE_ENTER_NEW_EMAIL]
                    }
                    error={errors.email ? localization[errors.email] : ""}
                    onBlur={(email) => {
                      if (validateEmail(email)) {
                        handleErrors({
                          email: validateEmail(email),
                        });
                      } else handleErrors({ email: "" });
                    }}
                  />
                  <Box className={styles.passwordBox}>
                    <Field
                      type="password"
                      value={password}
                      onChange={setPassword}
                      placeholder={localization[ELocalization.CONFIRM_PASSWORD]}
                      error={
                        errors.password ? localization[errors.password] : ""
                      }
                      onBlur={(password) => {
                        if (validatePassword(password)) {
                          handleErrors({
                            password: validatePassword(password),
                          });
                        } else handleErrors({ password: "" });
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>
          </ContentWrapper>
        </Stack>
      </Modal>
    </Box>
  );
};
