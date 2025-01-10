import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import SelectorOption from "@/components/molecules/SelectorOption";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";
import SelectorFooter from "@/components/molecules/SelectorFooter";

import { DEFAULT_ASPECT_DATA, ELocalizationQuestionnaire } from "@/constants";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { logEvent } from "@/utils/amplitude";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";

import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

const AspectsSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

  const { aspects: aspectsState } = state.motivation;

  const handleNext = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress + 1,
      }),
    );
    questFBProgressLog(progress + 1);

    logEvent(`web_quest_skills_${aspectsState}_on_continue`);

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

  const handleOption = (aspect: string) => {
    if (aspectsState.includes(aspect)) {
      const filteredData = aspectsState.filter((el) => el !== aspect);
      return dispatch(
        setQuestionnaire({
          ...state,
          motivation: { ...state.motivation, aspects: filteredData },
        }),
      );
    }

    dispatch(
      setQuestionnaire({
        ...state,
        motivation: { ...state.motivation, aspects: [...aspectsState, aspect] },
      }),
    );
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={
            <span className={styles.titleSmall}>
              {localization[ELocalizationQuestionnaire.QUEST_ASPECT_TITLE]}
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
          {DEFAULT_ASPECT_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title]}
              onClick={() => handleOption(el.value || "")}
              isMultiselect
              isActive={aspectsState.includes(el.value || "")}
            />
          ))}
        </Box>
      </Box>
      <SelectorFooter
        onClick={handleNext}
        disabled={aspectsState.length === 0}
      />
    </MainContainer>
  );
};

export default AspectsSelector;
