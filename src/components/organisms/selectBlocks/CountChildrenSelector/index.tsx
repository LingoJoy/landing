import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import SelectorOption from "@/components/molecules/SelectorOption";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";

import {
  DEFAULT_COUNT_CHILDREN_DATA,
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

const CountChildrenSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
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

  const handleOption = (count: string) => {
    dispatch(
      setQuestionnaire({
        ...state,
        children: { ...state.children, count },
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
            localization[ELocalizationQuestionnaire.QUEST_CHILDREN_COUNT_TITLE]
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_PERSONALIZATION_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          {DEFAULT_COUNT_CHILDREN_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={el.value}
              onClick={() => handleOption(el.value || "")}
              isActive={state.children.count === el.value}
            />
          ))}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default CountChildrenSelector;
