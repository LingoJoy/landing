import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import SelectorOption from "@/components/molecules/SelectorOption";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";
import SelectorFooter from "@/components/molecules/SelectorFooter";

import {
  DEFAULT_AGE_CHILDREN_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";

import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

const AgeChildrenSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();
  const localization = useSelector(getLocalizationQuestionnaire);

  const { childrenAge: ageState } = state.children;

  const handleNext = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        step: progress + 1,
      }),
    );

    questFBProgressLog(progress + 1);

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

  const handleOption = (childrenAge: string) => {
    if (ageState.includes(childrenAge)) {
      const filteredData = ageState.filter((el) => el !== childrenAge);

      return dispatch(
        setQuestionnaire({
          ...state,
          children: { ...state.children, childrenAge: filteredData },
        }),
      );
    }

    dispatch(
      setQuestionnaire({
        ...state,
        children: {
          ...state.children,
          childrenAge: [...ageState, childrenAge],
        },
      }),
    );
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={
            localization[ELocalizationQuestionnaire.QUEST_CHILDREN_AGE_TITLE]
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
          {DEFAULT_AGE_CHILDREN_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={el.value}
              onClick={() => handleOption(el.value || "")}
              isMultiselect
              isActive={ageState.includes(el.value || "")}
            />
          ))}
        </Box>
      </Box>
      <SelectorFooter onClick={handleNext} disabled={ageState.length === 0} />
    </MainContainer>
  );
};

export default AgeChildrenSelector;
