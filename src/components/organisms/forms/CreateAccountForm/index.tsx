import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Check from "@/components/atoms/Check";

import BackButton from "@/components/atoms/BackButton";
import Field from "@/components/atoms/Field";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import PulseButton from "@/components/atoms/PulseButton";
import CardWrapper from "../../CardWrapper";
import ContentContainer from "../../ContentContainer";

import Background from "@/assets/login-bg.png";

import {
  DEFAULT_YOUR_PLAN_DATA,
  ELocalization,
  ELocalizationQuestionnaire,
  ERoutes,
  EUrls,
  FB_EVENT,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { setPlan } from "@/store/plan";
import { getProfile, setProfile } from "@/store/profile";
import { getQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import axios from "@/utils/AxiosConfig";
import { logFBConventionsEvent, logFBEvent } from "@/utils/facebookSDK";
import { getLevel } from "@/utils/getLevel";
import { validateQuestEmail, validateQuestPassword } from "@/utils/validations";
import { useAlert } from "../../AlertMessage";

import { TProfileResponse } from "@/types";

import { AuthResponse, useLoginMutation } from "@/store/auth/query";
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

const DEFAULT_SUBSCRIBE_OPTIONS = [
  ELocalization.REGISTER_AGREE,
];

const CreateAccountForm = () => {
  const questionnaire = useSelector(getQuestionnaire);
  const localization = useSelector(getLocalizationQuestionnaire);
  const profile = useSelector(getProfile);
  const [options, setOptions] = useState<string[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const { vocabulary, personal, email: storeEmail } = questionnaire;

  const [email, setEmail] = useState(profile?.email || storeEmail || "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IErrors>({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const words =
    vocabulary.a.length + vocabulary.b1.length * 2 + vocabulary.b2.length * 3;

  const level = getLevel(words);

  const navigate = useNavigate();

  const handleErrors = (value: Partial<IErrors>) => {
    setErrors({ ...errors, ...value });
  };

  useEffect(() => {
    if (!errors.email && !errors.password && options.includes(ELocalization.REGISTER_AGREE)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [errors, options]);

  const handleOption = (value: string) => {
    if (options.includes(value)) {
      const filteredData = options.filter((el) => el !== value);

      return setOptions(filteredData);
    }

    setOptions([...options, value]);
  };

  const handleLogin = async () => {
    const data: AuthResponse = await login({ email, password }).unwrap();
    dispatch(setProfile(data.user));

    dispatch(
      setPlan({
        ...DEFAULT_YOUR_PLAN_DATA[0],
      }),
    );

    sessionStorage.setItem("LingoJoyLogin", "true");
  }

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

      await handleLogin();

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
        console.error('log: err', err.response.data.message);

        if (err.response.data.message)
          showAlert(false, err.response.data.message);
      }
    }
  };

  return (
    <Box className={styles.wrapper} data-class="SignUp-CreateAccountForm">
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

                {DEFAULT_SUBSCRIBE_OPTIONS.map((el) => (
                  <Box
                    key={el}
                    className={styles.contentAgree}
                    onClick={() => handleOption(el)}
                  >
                    <Check isActive={options.includes(el)} />
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        lineHeight: "1.125rem",
                        ml: "8px",
                      }}
                    >
                      {localization[ELocalizationQuestionnaire.REGISTER_AGREE]}
                    </Typography>
                  </Box>
                ))}
              </form>
              <PulseButton disabled={isDisabled} onClick={handleSubmit} className={styles.button}>
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
