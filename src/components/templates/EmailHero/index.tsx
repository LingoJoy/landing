import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Box } from "@mui/material";

import ContentContainer from "@/components/organisms/ContentContainer";
import Field from "@/components/atoms/Field";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import LogoIcon from "@/components/atoms/icons/LogoIcon";

import MailImage from "@/assets/mail.png";
import LockImage from "@/assets/icons/lock-circle.svg";

import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { validateQuestEmail } from "@/utils/validations";
import { ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";
import { logEvent } from "@/utils/amplitude";

const EmailHero = () => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();
  const { search } = useLocation();

  const localization = useSelector(getLocalizationQuestionnaire);

  const navigate = useNavigate();

  const [email, setEmail] = useState(state.email);
  const [error, setError] = useState<ELocalizationQuestionnaire | "">("");

  const handleEmail = () => {
    dispatch(setQuestionnaire({ ...state, email }));

    logEvent(`web_quest_email_${email}_on_continue`);

    navigate({
      pathname: ERoutes.WORDS,
      search,
    });
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
      <img className={styles.centerImage} src={MailImage} alt="" />
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box>
            <h2 className={styles.title}>
              {localization[ELocalizationQuestionnaire.QUEST_EMAIL_TITLE]}
            </h2>
            <Field
              value={email}
              onChange={setEmail}
              error={error ? localization[error] : ""}
              onBlur={(email) => {
                if (validateQuestEmail(email)) {
                  setError(validateQuestEmail(email));
                } else setError("");
              }}
              placeholder={
                localization[ELocalizationQuestionnaire.ENTER_YOUR_EMAIL]
              }
            />
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
