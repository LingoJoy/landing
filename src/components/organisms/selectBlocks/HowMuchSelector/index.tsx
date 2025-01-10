import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import SelectorOption from "@/components/molecules/SelectorOption";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";

import { DEFAULT_HOW_MUCH_DATA, ELocalizationQuestionnaire } from "@/constants";
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

const HowMuchSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
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

  const handleOption = (howMuch: string) => {
    dispatch(
      setQuestionnaire({
        ...state,
        time: { ...state.time, howMuch },
        step: progress + 1,
      }),
    );

    questFBProgressLog(progress + 1);

    logEvent(`web_quest_how_much_${howMuch}_on_continue`);

    onNext();
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={localization[ELocalizationQuestionnaire.QUEST_TIME_MUCH_TITLE]}
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_PERSONALIZATION_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          {DEFAULT_HOW_MUCH_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title]}
              onClick={() => handleOption(el.value || "")}
              isActive={state.time.howMuch === el.value}
            />
          ))}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default HowMuchSelector;
