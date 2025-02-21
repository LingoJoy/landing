import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectorHeader from "@/components/molecules/SelectorHeader";
import SelectorOption from "@/components/molecules/SelectorOption";
import MainContainer from "@/components/organisms/MainContainer";

import {
  DEFAULT_ENGLISH_ENVIRONMENT_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import { handleGetBooleanAgreement } from "@/utils/handleGetters";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";

import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

const EnglishEnvironmentSelector: FC<IProps> = ({
  onNext,
  onBack,
  progress,
}) => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

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

  const handleOption = (agreement: string) => {
    dispatch(
      setQuestionnaire({
        ...state,
        motivation: {
          ...state.motivation,
          englishEnvironment: agreement === "Yes",
        },
        step: progress + 1,
      }),
    );
    questFBProgressLog(progress + 1);

    logEvent(`web_quest_with_games_on_continue`);

    onNext();
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={
            <span className={styles.titleSmall}>
              {
                localization[
                  ELocalizationQuestionnaire.QUEST_ENG_ENVIRONMENT_TITLE
                ]
              }
            </span>
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_LANGUAGE_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          {DEFAULT_ENGLISH_ENVIRONMENT_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title]}
              onClick={() => handleOption(el.value || "")}
              isActive={handleGetBooleanAgreement(
                el.value || "",
                state.motivation.englishEnvironment,
              )}
            />
          ))}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default EnglishEnvironmentSelector;
