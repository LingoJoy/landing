import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectorFooter from "@/components/molecules/SelectorFooter";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import SelectorOption from "@/components/molecules/SelectorOption";
import MainContainer from "@/components/organisms/MainContainer";

import { DEFAULT_TOPICS_DATA, ELocalizationQuestionnaire } from "@/constants";
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

const TopicsSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

  const { topics: topicsState } = state.time;

  const handleNext = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress + 1,
      }),
    );

    questFBProgressLog(progress + 1);

    logEvent(`web_quest_topics_on_continue`);

    onNext();
  };

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

  const handleOption = (topic: string) => {
    if (topicsState.includes(topic)) {
      const filteredData = topicsState.filter((el) => el !== topic);
      return dispatch(
        setQuestionnaire({
          ...state,
          time: { ...state.time, topics: filteredData },
        }),
      );
    }
    dispatch(
      setQuestionnaire({
        ...state,
        time: { ...state.time, topics: [...topicsState, topic] },
      }),
    );
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={
            <span className={styles.titleSmall}>
              {localization[ELocalizationQuestionnaire.QUEST_TIME_TOPICS_TITLE]}
            </span>
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_PERSONALIZATION_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          <p className={styles.selectorHelperText}>
            {localization[ELocalizationQuestionnaire.QUEST_MORE_ONE]}
          </p>
          {DEFAULT_TOPICS_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title]}
              onClick={() => handleOption(el.value || "")}
              isMultiselect
              isActive={topicsState.includes(el.value || "")}
            />
          ))}
        </Box>
      </Box>
      <SelectorFooter
        onClick={handleNext}
        disabled={topicsState.length === 0}
      />
    </MainContainer>
  );
};

export default TopicsSelector;
