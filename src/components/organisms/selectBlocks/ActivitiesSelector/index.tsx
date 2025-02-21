import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectorHeader from "@/components/molecules/SelectorHeader";
import SelectorOption from "@/components/molecules/SelectorOption";
import MainContainer from "@/components/organisms/MainContainer";

import {
  DEFAULT_ACTIVITY_LEVEL_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";

import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

const ActivitiesSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
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

    logEvent(`web_quest_how_active_on_continue`);

    onBack();
  };

  const handleOption = (activityLevel: string) => {
    dispatch(
      setQuestionnaire({
        ...state,
        time: { ...state.time, activityLevel },
        step: progress + 1,
      }),
    );

    questFBProgressLog(progress + 1);

    onNext();
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={
            localization[ELocalizationQuestionnaire.QUEST_TIME_ACTIVITIES_TITLE]
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_PERSONALIZATION_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          {DEFAULT_ACTIVITY_LEVEL_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title]}
              onClick={() => handleOption(el.value || "")}
              isActive={state.time.activityLevel === el.value}
            />
          ))}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default ActivitiesSelector;
