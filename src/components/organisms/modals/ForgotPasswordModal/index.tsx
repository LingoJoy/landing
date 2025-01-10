import { FC, ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Divider, Stack } from "@mui/material";

import Field from "@/components/atoms/Field";
import Modal from "@/components/atoms/Modal";

import { validateQuestEmail, validateQuestPassword } from "@/utils/validations";
import { ELocalizationQuestionnaire, EUrls } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import axios from "@/utils/AxiosConfig";
import { User } from "@/store/auth/query";
import { setProfile } from "@/store/profile";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForgotFormProps {
  title: ReactNode;
  description: ReactNode;
  step: number;
  children: ReactNode;
}

interface IErrors {
  repeatPassword: ELocalizationQuestionnaire | "";
  newPassword: ELocalizationQuestionnaire | "";
  code: ELocalizationQuestionnaire | "";
  email: ELocalizationQuestionnaire | "";
}

const ForgotForm: FC<IForgotFormProps> = ({
  title,
  description,
  step,
  children,
}) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <form>
      <p className={styles.steps}>
        {localization[ELocalizationQuestionnaire.STEP]} {step}{" "}
        {localization[ELocalizationQuestionnaire.OF]} 3
      </p>
      <h3 className={styles.name}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {children}
    </form>
  );
};

const ForgotPasswordModal: FC<IProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState<IErrors>({
    repeatPassword: "",
    newPassword: "",
    code: "",
    email: "",
  });

  const localization = useSelector(getLocalizationQuestionnaire);

  const dispatch = useDispatch();

  const handleClose = () => {
    setStep(1);
    setCode("");
    setRepeatPassword("");
    setNewPassword("");
    setErrors({
      repeatPassword: "",
      newPassword: "",
      code: "",
      email: "",
    });
    onClose();
  };

  const handleErrors = (value: Partial<IErrors>) => {
    setErrors({ ...errors, ...value });
  };

  const handleSubmitCode = async () => {
    try {
      setStep(3);
      logEvent(`web_forgot_password_code_sended`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitEmail = async () => {
    try {
      await axios.post(EUrls.USERS_RESET, { email });

      logEvent(`web_forgot_password_${email}_on_send`);

      setStep(2);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitPassword = async () => {
    if (repeatPassword !== newPassword) {
      return handleErrors({
        newPassword: ELocalizationQuestionnaire.PASSWORD_NO_MATCH,
        repeatPassword: ELocalizationQuestionnaire.PASSWORD_NO_MATCH,
      });
    } else
      setErrors({
        repeatPassword: "",
        newPassword: "",
        code: "",
        email: "",
      });

    try {
      const { data }: { data: User } = await axios.patch(
        EUrls.USERS_CHANGE_PASS_UNAUTH,
        {
          email,
          code,
          newPass: newPassword,
        },
      );
      dispatch(setProfile(data));

      logEvent(`web_forgot_password_on_change`);

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisabled = () => {
    switch (step) {
      case 1:
        return !email || !!errors.email;
      case 2:
        return !code || !!errors.code;
      case 3:
        return (
          !repeatPassword ||
          !newPassword ||
          !!errors.repeatPassword ||
          !!errors.newPassword
        );

      default:
        return false;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      button={
        <Box className={styles.webWrapper}>
          <Button
            sx={{ width: "100%" }}
            onClick={() => {
              if (step === 1) return handleSubmitEmail();
              if (step === 2) return handleSubmitCode();
              handleSubmitPassword();
            }}
            disabled={handleDisabled()}
          >
            {step === 3
              ? localization[ELocalizationQuestionnaire.LOGIN_RECOVER_PASSWORD]
              : localization[ELocalizationQuestionnaire.NEXT]}
          </Button>
        </Box>
      }
      cardClass={styles.card}
    >
      <Box className={styles.headerWrapper}>
        <h3 className={styles.title}>
          {localization[ELocalizationQuestionnaire.LOGIN_FORGOT_TITLE]}
        </h3>
      </Box>
      <Divider />
      <Stack className={styles.modalBody}>
        <Box className={styles.webWrapper}>
          <Box className={styles.contentWrapper}>
            {step === 1 && (
              <ForgotForm
                title={
                  localization[
                    ELocalizationQuestionnaire.LOGIN_FORGOT_TITLE_EMAIL
                  ]
                }
                step={step}
                description={
                  localization[
                    ELocalizationQuestionnaire.LOGIN_FORGOT_DESCR_EMAIL
                  ]
                }
              >
                <Field
                  value={email}
                  onChange={setEmail}
                  error={errors.email ? localization[errors.email] : ""}
                  onBlur={(email) => {
                    if (validateQuestEmail(email)) {
                      handleErrors({ email: validateQuestEmail(email) });
                    } else handleErrors({ email: "" });
                  }}
                  type="email"
                  placeholder={
                    localization[
                      ELocalizationQuestionnaire.LOGIN_EMAIL_PLACEHOLDER
                    ]
                  }
                />
              </ForgotForm>
            )}
            {step === 2 && (
              <ForgotForm
                title={
                  localization[
                    ELocalizationQuestionnaire.LOGIN_FORGOT_TITLE_CODE
                  ]
                }
                step={step}
                description={
                  localization[
                    ELocalizationQuestionnaire.LOGIN_FORGOT_DESCR_CODE
                  ]
                }
              >
                <Field
                  value={code}
                  onChange={setCode}
                  error={errors.code ? localization[errors.code] : ""}
                  placeholder={
                    localization[
                      ELocalizationQuestionnaire.LOGIN_FORGOT_PLACEHOLDER_CODE
                    ]
                  }
                />
              </ForgotForm>
            )}
            {step === 3 && (
              <ForgotForm
                title={
                  localization[ELocalizationQuestionnaire.ENTER_NEW_PASSWORD]
                }
                step={step}
                description={
                  localization[
                    ELocalizationQuestionnaire.LOGIN_FORGOT_DESCR_PASSWORD
                  ]
                }
              >
                <>
                  <Field
                    value={newPassword}
                    onChange={setNewPassword}
                    type="password"
                    error={
                      errors.newPassword ? localization[errors.newPassword] : ""
                    }
                    placeholder={
                      localization[
                        ELocalizationQuestionnaire.ENTER_NEW_PASSWORD
                      ]
                    }
                    onBlur={(password) => {
                      if (validateQuestPassword(password)) {
                        handleErrors({
                          newPassword: validateQuestPassword(password),
                        });
                      } else handleErrors({ newPassword: "" });
                    }}
                  />
                  <p className={styles.helperText}>
                    {localization[ELocalizationQuestionnaire.PASSWORD_RULE]}
                  </p>
                  <Field
                    value={repeatPassword}
                    onChange={setRepeatPassword}
                    type="password"
                    placeholder={
                      localization[
                        ELocalizationQuestionnaire.REPEAT_NEW_PASSWORD
                      ]
                    }
                    error={
                      errors.repeatPassword
                        ? localization[errors.repeatPassword]
                        : ""
                    }
                    onBlur={(password) => {
                      if (validateQuestPassword(password)) {
                        handleErrors({
                          repeatPassword: validateQuestPassword(password),
                        });
                      } else handleErrors({ repeatPassword: "" });
                    }}
                  />
                </>
              </ForgotForm>
            )}
          </Box>
        </Box>
      </Stack>
    </Modal>
  );
};

export default ForgotPasswordModal;
