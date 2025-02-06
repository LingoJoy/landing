import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectorHeader from "@/components/molecules/SelectorHeader";
import SelectorOption from "@/components/molecules/SelectorOption";
import MainContainer from "@/components/organisms/MainContainer";
import ChangeLanguageHero from "@/components/templates/ChangeLanguageHero";

import {
  DEFAULT_QUEST_LANGUAGE_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import {
  getLocalizationQuestionnaire,
  setLocalizationQuestionnaire,
} from "@/store/localization-questionnaire";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import { getServerLocalization } from "@/utils/apiHelpers";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";

import { TLocalizationQuestionnaireType } from "@/types";

import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

const LanguageSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
  const [language, setLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

  const defaultLanguage =
    localStorage.getItem("localeQuest") || navigator.language.split("-")[0];
  const activeLanguage = DEFAULT_QUEST_LANGUAGE_DATA.find(
    (el) => el.translate === defaultLanguage
  );
  const filterLanguages = DEFAULT_QUEST_LANGUAGE_DATA.filter(
    (el) => el.translate !== defaultLanguage
  );
  const languages = activeLanguage
    ? [activeLanguage, ...filterLanguages]
    : DEFAULT_QUEST_LANGUAGE_DATA;

  const handleBack = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress - 1 || 1,
      })
    );

    questFBProgressLog(progress - 1 || 1);

    onBack();
  };

  const handleOption = async (option?: string) => {
    const optionLanguage = option || language;

    setIsLoading(true);
    setLoadingMessage(`Loading...`);
    setErrorMessage("");

    try {
      dispatch(
        setQuestionnaire({
          ...state,
          motivation: { ...state.motivation, language: optionLanguage },
          step: progress + 1,
        })
      );

      questFBProgressLog(progress + 1);
      localStorage.setItem("localeQuest", optionLanguage);

      const { localizationQuest } = await getServerLocalization();

      const { data }: { data: TLocalizationQuestionnaireType } = await axios({
        url: `${optionLanguage}.json`,
        baseURL: localizationQuest,
      });

      dispatch(setLocalizationQuestionnaire(data));
      logEvent(`web_quest_language_${optionLanguage}_on_continue`);

      onNext();
    } catch (error: Error | any) {
      setErrorMessage(`Failed to load ${optionLanguage} language data. Please try again. ${error.message || ""} ${error.config.url || ""}`);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = (selectedLanguage: string) => {
    if (isLoading) return;

    if (defaultLanguage === selectedLanguage) {
      handleOption(selectedLanguage);
    } else {
      logEvent(`web_quest_language_${selectedLanguage}_on_select`);
      setLanguage(selectedLanguage);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  };

  const handleCancel = () => {
    logEvent(`web_quest_language_${language}_on_cancel`);
    setLanguage("");
  };

  if (language && !isLoading)
    return (
      <ChangeLanguageHero
        onChange={() => handleOption(language)}
        onCancel={handleCancel}
        language={language}
      />
    );

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={localization[ELocalizationQuestionnaire.QUEST_LANGUAGE_TITLE]}
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_LANGUAGE_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          {languages.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title] || el.title}
              onClick={() => handleNext(el.translate || "")}
            />
          ))}
        </Box>
      </Box>

      <Modal open={isLoading}>
      <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>{loadingMessage}</Typography>
        </Box>
      </Modal>

      <Modal open={!!errorMessage}>
        <Box className={styles.modalBox}>
          <Typography sx={{ mt: 2, color: "red" }}>{errorMessage}</Typography>
          <Button onClick={() => setErrorMessage("")} sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>
    </MainContainer>
  );
};

export default LanguageSelector;
