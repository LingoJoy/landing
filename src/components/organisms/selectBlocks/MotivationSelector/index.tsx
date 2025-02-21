import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectorFooter from "@/components/molecules/SelectorFooter";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import SelectorOption from "@/components/molecules/SelectorOption";
import MainContainer from "@/components/organisms/MainContainer";

import {
  DEFAULT_MOTIVATION_DATA,
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

const MotivationSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

  const { motivation: motivationState } = state.motivation;

  const handleNext = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress + 1,
      }),
    );
    questFBProgressLog(progress + 1);

    logEvent(`web_quest_motivation_on_continue`);

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

  const handleOption = (motivation: string) => {
    if (motivationState.includes(motivation)) {
      const filteredData = motivationState.filter((el) => el !== motivation);

      return dispatch(
        setQuestionnaire({
          ...state,
          motivation: { ...state.motivation, motivation: filteredData },
        }),
      );
    }

    dispatch(
      setQuestionnaire({
        ...state,
        motivation: {
          ...state.motivation,
          motivation: [...motivationState, motivation],
        },
      }),
    );
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={
            <span className={styles.titleSmall}>
              {localization[ELocalizationQuestionnaire.QUEST_MOTIVATION_TITLE]}
            </span>
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_LANGUAGE_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          <p className={styles.selectorHelperText}>
            {localization[ELocalizationQuestionnaire.QUEST_MORE_ONE]}
          </p>
          {DEFAULT_MOTIVATION_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title]}
              onClick={() => handleOption(el.value || "")}
              isMultiselect
              isActive={el.value ? motivationState.includes(el.value) : false}
            />
          ))}
        </Box>
      </Box>
      <SelectorFooter
        onClick={handleNext}
        disabled={motivationState.length === 0}
      />
    </MainContainer>
  );
};

export default MotivationSelector;
