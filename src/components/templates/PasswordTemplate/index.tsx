import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BackButton from "@/components/atoms/BackButton";
import Field from "@/components/atoms/Field";
import Modal from "@/components/atoms/Modal";
import CardWrapper from "@/components/organisms/CardWrapper";
import ContentWrapper from "@/components/organisms/ContentWrapper";

import { ELocalization, EUrls } from "@/constants";
import { ERoutes } from "@/constants/pages";
import { User } from "@/store/auth/query";
import { getLocalization } from "@/store/localization";
import axios from "@/utils/AxiosConfig";
import { validatePassword } from "@/utils/validations";

import ForgotPasswordAuthModal from "@/components/organisms/modals/ForgotPasswordAuthModal";
import { getProfile, setProfile } from "@/store/profile";
import { logEvent } from "@/utils/amplitude";
import styles from "./index.module.scss";

interface IErrors {
  oldPassword: ELocalization | "";
  repeatPassword: ELocalization | "";
  newPassword: ELocalization | "";
}

export const PasswordTemplate: React.FC = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOpenForgotModal, setIsOpenForgotModal] = useState(false);
  const [errors, setErrors] = useState<IErrors>({
    oldPassword: "",
    repeatPassword: "",
    newPassword: "",
  });

  const localization = useSelector(getLocalization);
  const profile = useSelector(getProfile);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleErrors = (value: Partial<IErrors>) => {
    setErrors({ ...errors, ...value });
  };

  const handleSubmitPassword = async () => {
    if (repeatPassword !== newPassword) {
      return handleErrors({
        newPassword: ELocalization.PASSWORD_NO_MATCH,
        repeatPassword: ELocalization.PASSWORD_NO_MATCH,
      });
    } else
      setErrors({
        repeatPassword: "",
        newPassword: "",
        oldPassword: "",
      });

    try {
      const { data }: { data: User } = await axios.patch(
        EUrls.USERS_CHANGE_PASS_OLD,
        {
          email: profile?.email,
          oldPass: oldPassword,
          newPass: newPassword,
        },
      );
      dispatch(setProfile(data));

      logEvent(`web_password_modal_on_change`);

      setIsOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    logEvent(`web_password_on_close`);
    navigate(ERoutes.PROFILE);
  };

  const handleOpenModal = () => {
    logEvent(`web_password_modal_on_show`);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    logEvent(`web_password_modal_on_hide`);
    setIsOpenModal(false);
  };

  const handleOpenForgotModal = async () => {
    try {
      await axios.post(EUrls.USERS_RESET, { email: profile?.email });

      logEvent(`web_forgot_password_on_send`);
    } catch (error) {
      console.error(error);
    }

    setIsOpenForgotModal(true);
    logEvent(`web_forgot_password_modal_on_show`);
  };

  const handleCloseForgotModal = () => {
    setIsOpenForgotModal(false);
    logEvent(`web_forgot_password_modal_on_hide`);
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
                {localization[ELocalization.PROFILE_PASSWORD]}
              </Typography>
            </Box>
            <Field type="password" value="•••••••••••••" />
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
                {localization[ELocalization.PROFILE_CHANGE_PASSWORD]}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                  color: "#3F97FF",
                  cursor: "pointer",
                }}
                component="span"
                onClick={handleOpenModal}
              >
                {localization[ELocalization.CLICK_HERE]}
              </Typography>
            </Box>
          </ContentWrapper>
        </Box>
      </CardWrapper>
      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        button={
          <Box className={styles.webWrapper}>
            <Button sx={{ width: "100%" }} onClick={handleSubmitPassword}>
              {localization[ELocalization.SAVE_NEW_PASSWORD]}
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
              {localization[ELocalization.CHANGE_PASSWORD]}
            </Typography>
          </Box>
        </ContentWrapper>
        <Divider />
        <ContentWrapper>
          <Box className={styles.webWrapper}>
            <Box className={styles.oldPasswordWrapper}>
              <Field
                type="password"
                value={oldPassword}
                placeholder={localization[ELocalization.ENTER_OLD_PASSWORD]}
                onChange={setOldPassword}
                error={
                  errors.oldPassword ? localization[errors.oldPassword] : ""
                }
                onBlur={(oldPassword) => {
                  if (validatePassword(oldPassword)) {
                    handleErrors({
                      oldPassword: validatePassword(oldPassword),
                    });
                  } else handleErrors({ oldPassword: "" });
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                lineHeight: "1rem",
                color: "#3F97FF",
                cursor: "pointer",
                marginBottom: "18px",
              }}
              onClick={handleOpenForgotModal}
            >
              {localization[ELocalization.PASSWORD_NO_REMEMBER]}
            </Typography>
          </Box>
        </ContentWrapper>
        <Divider />
        <ContentWrapper>
          <Box className={styles.webWrapper}>
            <Box className={styles.oldPasswordWrapper}>
              <Field
                type="password"
                value={newPassword}
                placeholder={localization[ELocalization.ENTER_NEW_PASSWORD]}
                onChange={setNewPassword}
                error={
                  errors.newPassword ? localization[errors.newPassword] : ""
                }
                onBlur={(newPassword) => {
                  if (validatePassword(newPassword)) {
                    handleErrors({
                      newPassword: validatePassword(newPassword),
                    });
                  } else handleErrors({ newPassword: "" });
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                lineHeight: "1rem",
                color: "#6E6E6E",
                marginBottom: "21px",
              }}
            >
              {localization[ELocalization.PASSWORD_RULE]}
            </Typography>
            <Field
              type="password"
              value={repeatPassword}
              placeholder={localization[ELocalization.REPEAT_NEW_PASSWORD]}
              onChange={setRepeatPassword}
              error={
                errors.repeatPassword ? localization[errors.repeatPassword] : ""
              }
              onBlur={(repeatPassword) => {
                if (validatePassword(repeatPassword)) {
                  handleErrors({
                    repeatPassword: validatePassword(repeatPassword),
                  });
                } else handleErrors({ repeatPassword: "" });
              }}
            />
          </Box>
        </ContentWrapper>
      </Modal>
        <ForgotPasswordAuthModal
          isOpen={isOpenForgotModal}
          onClose={handleCloseForgotModal}
        />
    </Box>
  );
};
