import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Box } from "@mui/material";

import SelectorOption from "@/components/molecules/SelectorOption";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";
import ChangeLanguageHero from "@/components/templates/ChangeLanguageHero";

import {
  DEFAULT_QUEST_LANGUAGE_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import {
  getLocalizationQuestionnaire,
  setLocalizationQuestionnaire,
} from "@/store/localization-questionnaire";
import { getServerLocalization } from "@/utils/apiHelpers";
import { logEvent } from "@/utils/amplitude";
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

  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

  const defaultLanguage =
    localStorage.getItem("localeQuest") || navigator.language.split("-")[0];
  const activeLanguage = DEFAULT_QUEST_LANGUAGE_DATA.find(
    (el) => el.translate === defaultLanguage,
  );
  const filterLanguages = DEFAULT_QUEST_LANGUAGE_DATA.filter(
    (el) => el.translate !== defaultLanguage,
  );
  const languages = activeLanguage
    ? [activeLanguage, ...filterLanguages]
    : DEFAULT_QUEST_LANGUAGE_DATA;

  const handleBack = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress - 1 || 1,
      }),
    );

    questFBProgressLog(progress - 1 || 1);

    onBack();
  };

  const handleOption = async (option?: string) => {
    const optionLanguage = option || language;

    dispatch(
      setQuestionnaire({
        ...state,
        motivation: { ...state.motivation, language: optionLanguage },
        step: progress + 1,
      }),
    );

    questFBProgressLog(progress + 1);

    localStorage.setItem("localeQuest", optionLanguage);

    try {
      const { localizationQuest } = await getServerLocalization();

      const { data }: { data: TLocalizationQuestionnaireType } = await axios({
        url: `${optionLanguage}.json`,
        baseURL: localizationQuest,
      });

      dispatch(setLocalizationQuestionnaire(data));

      logEvent(`web_quest_language_${language}_on_continue`);

      onNext();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = (language: string) => {
    if (defaultLanguage === language) return handleOption(defaultLanguage);

    logEvent(`web_quest_language_${language}_on_select`);
    setLanguage(language);
  };

  const handleCancel = () => {
    logEvent(`web_quest_language_${language}_on_cancel`);
    setLanguage("");
  };

  if (language)
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
              title={localization[el.title]}
              onClick={() => handleNext(el.translate || "")}
              isActive={defaultLanguage === el.translate}
            />
          ))}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default LanguageSelector;
