import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import BackButton from "@/components/atoms/BackButton";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import ContentContainer from "../../ContentContainer";
import ForgotPasswordModal from "../../modals/ForgotPasswordModal";
import Field from "@/components/atoms/Field";
import CardWrapper from "../../CardWrapper";
import PulseButton from "@/components/atoms/PulseButton";

import Background from "@/assets/login-bg.png";
import CheckImage from "@/assets/check.svg";

import {
  DEFAULT_YOUR_PLAN_DATA,
  ELocalizationQuestionnaire,
  ERoutes,
} from "@/constants";
import { setPlan } from "@/store/plan";
import { validateQuestEmail, validateQuestPassword } from "@/utils/validations";
import { AuthResponse, useLoginMutation } from "@/store/auth/query";
import { setProfile } from "@/store/profile";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { logEvent } from "@/utils/amplitude";

import { IError } from "@/types";

import styles from "./index.module.scss";

interface IErrors {
  email: ELocalizationQuestionnaire | "";
  password: ELocalizationQuestionnaire | "";
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(true);
  const [isOpenForgotModal, setIsOpenForgotModal] = useState(false);
  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
  });

  const localization = useSelector(getLocalizationQuestionnaire);

  const [login] = useLoginMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleErrors = (value: Partial<IErrors>) => {
    setErrors({ ...errors, ...value });
  };

  const handleSubmit = async () => {
    try {
      const data: AuthResponse = await login({ email, password }).unwrap();
      dispatch(setProfile(data.user));

      dispatch(
        setPlan({
          ...DEFAULT_YOUR_PLAN_DATA[0],
        }),
      );

      if (isRememberMe) {
        localStorage.setItem(
          "LingoJoyLoginDate",
          `${new Date().toISOString()}`,
        );
      } else sessionStorage.setItem("LingoJoyLogin", "true");

      logEvent(`web_login_${email}`);

      setErrors({ email: "", password: "" });
      navigate(ERoutes.COURSES);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const err = error as IError;
        if (err.status === 400 || err.status === 401) {
          handleErrors({
            email: ELocalizationQuestionnaire.LOGIN_INVALID,
            password: ELocalizationQuestionnaire.LOGIN_INVALID,
          });
        } else {
          handleErrors({
            email: ELocalizationQuestionnaire.LOGIN_UNEXPECTED,
            password: ELocalizationQuestionnaire.LOGIN_UNEXPECTED,
          });
        }
      } else {
        handleErrors({
          email: ELocalizationQuestionnaire.LOGIN_ERROR,
          password: ELocalizationQuestionnaire.LOGIN_ERROR,
        });
      }
    }
  };

  const handleOpenModal = () => {
    setIsOpenForgotModal(true);
    logEvent(`web_forgot_password_modal_on_show`);
  };

  const handleCloseModal = () => {
    setIsOpenForgotModal(false);
    logEvent(`web_forgot_password_modal_on_hide`);
  };

  return (
    <Box className={styles.wrapper}>
      <ForgotPasswordModal
        isOpen={isOpenForgotModal}
        onClose={handleCloseModal}
      />
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <img src={Background} alt="" className={styles.background} />
      <Box className={styles.cardBox}>
        <CardWrapper className={styles.card}>
          <Box className={styles.logoWrapper}>
            <LogoIcon width="85" height="28" />
          </Box>
          <ContentContainer>
            <Box className={styles.contentWrapper}>
              <Box className={styles.backWrapper}>
                <Link to={ERoutes.QUESTIONNAIRE_START}>
                  <BackButton position="right" />
                </Link>
              </Box>
              <h2 className={styles.title}>
                {localization[ELocalizationQuestionnaire.LOGIN_TITLE]}
              </h2>
              <p className={styles.description}>
                {localization[ELocalizationQuestionnaire.LOGIN_DESCR]}
              </p>
              <form className={styles.fieldsWrapper}>
                <Box className={styles.fieldBox}>
                  <Field
                    value={email}
                    onChange={setEmail}
                    error={errors.email ? localization[errors.email] : ""}
                    onBlur={(email) => {
                      if (validateQuestEmail(email)) {
                        handleErrors({
                          email: validateQuestEmail(email),
                        });
                      } else handleErrors({ email: "" });
                    }}
                    type="email"
                    placeholder={
                      localization[
                        ELocalizationQuestionnaire.LOGIN_EMAIL_PLACEHOLDER
                      ]
                    }
                  />
                </Box>
                <Field
                  value={password}
                  onChange={setPassword}
                  type="password"
                  placeholder={
                    localization[
                      ELocalizationQuestionnaire.LOGIN_PASSWORD_PLACEHOLDER
                    ]
                  }
                  error={errors.password ? localization[errors.password] : ""}
                  onBlur={(password) => {
                    if (validateQuestPassword(password)) {
                      handleErrors({
                        password: validateQuestPassword(password),
                      });
                    } else handleErrors({ password: "" });
                  }}
                />
              </form>
              <Box
                className={styles.checkboxWrapper}
                onClick={() => setIsRememberMe(!isRememberMe)}
              >
                {isRememberMe ? (
                  <Box className={styles.checkboxCheckedIcon}>
                    <CheckImage />
                  </Box>
                ) : (
                  <Box className={styles.checkboxIcon} />
                )}
                <p className={styles.checkboxText}>
                  {localization[ELocalizationQuestionnaire.LOGIN_STAY_LOGGED]}
                </p>
              </Box>
              <PulseButton onClick={handleSubmit} className={styles.button}>
                {localization[ELocalizationQuestionnaire.LOGIN_TITLE]}
              </PulseButton>
              <p className={styles.link} onClick={handleOpenModal}>
                {localization[ELocalizationQuestionnaire.LOGIN_FORGOT]}
              </p>
            </Box>
          </ContentContainer>
        </CardWrapper>
      </Box>
    </Box>
  );
};

export default LoginForm;
