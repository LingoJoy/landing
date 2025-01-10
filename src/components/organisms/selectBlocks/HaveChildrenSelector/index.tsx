import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import SelectorOption from "@/components/molecules/SelectorOption";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";

import {
  DEFAULT_HAVE_CHILDREN_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { handleGetBooleanAgreement } from "@/utils/handleGetters";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";

import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
  progress: number;
}

const HaveChildrenSelector: FC<IProps> = ({
  onNext,
  onBack,
  onSkip,
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
    const agree = agreement === "Yes";

    dispatch(
      setQuestionnaire({
        ...state,
        children: { ...state.children, have: agree },
        step: progress + 1,
      }),
    );
    questFBProgressLog(progress + 1);

    return agree ? onNext() : onSkip();
  };

  return (
    <MainContainer background="#eef3f9">
      <Box>
        <SelectorHeader
          title={localization[ELocalizationQuestionnaire.QUEST_CHILDREN_TITLE]}
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_PERSONALIZATION_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          {DEFAULT_HAVE_CHILDREN_DATA.map((el) => (
            <SelectorOption
              key={el.id}
              icon={el.icon}
              title={localization[el.title]}
              onClick={() => handleOption(el.value || "")}
              isActive={handleGetBooleanAgreement(
                el.value || "",
                state.children.have,
              )}
            />
          ))}
        </Box>
      </Box>
    </MainContainer>
  );
};

export default HaveChildrenSelector;
