import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import BackButton from "@/components/atoms/BackButton";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import ContentContainer from "../../ContentContainer";
import Field from "@/components/atoms/Field";
import CardWrapper from "../../CardWrapper";
import PulseButton from "@/components/atoms/PulseButton";

import Background from "@/assets/login-bg.png";

import {
  DEFAULT_YOUR_PLAN_DATA,
  ELocalizationQuestionnaire,
  ERoutes,
  EUrls,
  FB_EVENT,
} from "@/constants";
import { validateQuestEmail, validateQuestPassword } from "@/utils/validations";
import { setPlan } from "@/store/plan";
import { setProfile } from "@/store/profile";
import { getQuestionnaire } from "@/store/questionnaire";
import axios from "@/utils/AxiosConfig";
import { getLevel } from "@/utils/getLevel";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { logEvent } from "@/utils/amplitude";
import { useAlert } from "../../AlertMessage";
import { logFBConventionsEvent, logFBEvent } from "@/utils/facebookSDK";

import { TProfileResponse } from "@/types";

import styles from "./index.module.scss";

interface IErrors {
  email: ELocalizationQuestionnaire | "";
  password: ELocalizationQuestionnaire | "";
}

interface IErrorResp {
  response: {
    data: {
      message: string;
    };
  };
}

const CreateAccountForm = () => {
  const questionnaire = useSelector(getQuestionnaire);
  const localization = useSelector(getLocalizationQuestionnaire);

  const { vocabulary, personal, email: storeEmail } = questionnaire;

  const [email, setEmail] = useState(storeEmail || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const words =
    vocabulary.a.length + vocabulary.b1.length * 2 + vocabulary.b2.length * 3;

  const level = getLevel(words);

  const navigate = useNavigate();

  const handleErrors = (value: Partial<IErrors>) => {
    setErrors({ ...errors, ...value });
  };

  const handleSubmit = async () => {
    if (errors.email || errors.password || !email || !password) return;

    try {
      const userData = {
        email: email.toLowerCase().trim(),
        password,
        level: level.code,
        name: personal.name,
        additional_info: questionnaire,
      };

      const { data }: TProfileResponse = await axios.post(
        EUrls.SIGN_UP,
        userData,
      );

      dispatch(setProfile(data.user));
      dispatch(
        setPlan({
          ...DEFAULT_YOUR_PLAN_DATA[0],
        }),
      );

      setErrors({
        email: "",
        password: "",
      });

      logEvent(`web_create_account_${email.toLowerCase().trim()}_on_continue`);
      logFBEvent(FB_EVENT.COMPLETE_REGISTRATION);
      logFBConventionsEvent(FB_EVENT.COMPLETE_REGISTRATION, email);
      navigate(ERoutes.COURSES);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const err = error as unknown as IErrorResp;

        if (err.response.data.message)
          showAlert(false, err.response.data.message);
      }
    }
  };

  return (
    <Box className={styles.wrapper}>
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
                {localization[ELocalizationQuestionnaire.CREATE_ACCOUNT_TITLE]}
              </h2>
              <p className={styles.description}>
                {localization[ELocalizationQuestionnaire.CREATE_ACCOUNT_DESCR]}
              </p>
              <form className={styles.fieldsWrapper}>
                <Box className={styles.fieldBox}>
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
                </Box>
                <Box>
                  <Field
                    value={password}
                    onChange={setPassword}
                    type="password"
                    placeholder={
                      localization[ELocalizationQuestionnaire.PASSWORD]
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
                  <p className={styles.infoText}>
                    {
                      localization[
                        ELocalizationQuestionnaire.CREATE_ACCOUNT_PASSWORD_RULE
                      ]
                    }
                  </p>
                </Box>
              </form>
              <PulseButton onClick={handleSubmit} className={styles.button}>
                {localization[ELocalizationQuestionnaire.SIGN_UP]}
              </PulseButton>
              <p className={styles.text}>
                {
                  localization[
                    ELocalizationQuestionnaire.CREATE_ACCOUNT_ALREADY
                  ]
                }{" "}
                <Link to={ERoutes.LOGIN}>
                  <span className={styles.link}>
                    {localization[ELocalizationQuestionnaire.LOGIN]}
                  </span>
                </Link>
              </p>
            </Box>
          </ContentContainer>
        </CardWrapper>
      </Box>
    </Box>
  );
};

export default CreateAccountForm;
