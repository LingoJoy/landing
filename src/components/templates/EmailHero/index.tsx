import { Box } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import ContentContainer from "@/components/organisms/ContentContainer";

import LockImage from "@/assets/icons/lock-circle.svg";

import { ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { validateQuestEmail } from "@/utils/validations";

import { logEvent } from "@/utils/amplitude";
import EmailField from "../../atoms/EmailField";
import styles from "./index.module.scss";

const popularDomains = [
  "gmail.com",
  "icloud.com",
  "yahoo.com",
  "outlook.com",
  "mail.ru",
  "hotmail.com",
  "aol.com",
  "protonmail.com",
  "yandex.ru",
  "zoho.com",
  "gmx.com",
  "live.com",
  "qq.com",
  "163.com",
  "inbox.com"
];

const EmailHero = () => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();
  const { search } = useLocation();

  const localization = useSelector(getLocalizationQuestionnaire);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>(state.email);
  const [error, setError] = useState<ELocalizationQuestionnaire | "">("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleEmailChange = (email: string) => {
    const newEmail = email;
    setEmail(newEmail);
    const validationError = validateQuestEmail(newEmail);
    setError(validationError ? validationError : "");

    if (newEmail.includes("@")) {
      const [localPart, domainPart = ""] = newEmail.split("@");
      const filteredDomains = popularDomains.filter((domain) => domain.startsWith(domainPart));
      setSuggestions(filteredDomains.map((domain) => `${localPart}@${domain}`));
    } else {
      setSuggestions([]);
    }
  };

  const handleEmail = () => {
    dispatch(setQuestionnaire({ ...state, email }));

    logEvent(`web_quest_email_${email}_on_continue`);

    navigate({
      pathname: ERoutes.WORDS,
      search,
    });
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setEmail(suggestion);
    setSuggestions([]);
    const validationError = validateQuestEmail(suggestion);
    setError(validationError ? validationError : "");
  };

  return (
    <Box className={styles.wrapper} data-class="TimePage-EmailHero">
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.ellipse}>
        <DreamsIcon color="#F8DFE3" />
      </Box>
      <Box className={styles.logoWrapper}>
        <LogoIcon width="90px" height="40" />
      </Box>
      <img className={styles.centerImage} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}mail.png`} alt="" />
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box>
            <h2 className={styles.title}>
              {localization[ELocalizationQuestionnaire.QUEST_EMAIL_TITLE]}
            </h2>

            <Box className={styles.wrapper}>
              <EmailField
                value={email}
                onChange={handleEmailChange}
                error={error ? localization[error] : ""}
                placeholder={localization[ELocalizationQuestionnaire.ENTER_YOUR_EMAIL]}
                suggestions={suggestions}
                onSelectSuggestion={handleSelectSuggestion}
              />
            </Box>
            <Box className={styles.descriptionWrapper}>
              <LockImage />
              <p className={styles.description}>
                {localization[ELocalizationQuestionnaire.QUEST_EMAIL_RESPECT]}
              </p>
            </Box>
          </Box>
        </Box>
      </ContentContainer>
      <SelectorFooter
        onClick={handleEmail}
        disabled={email === "" || error !== ""}
      />
    </Box>
  );
};

export default EmailHero;
