import { Box } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Field from "@/components/atoms/Field";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import { questFBProgressLog } from "@/utils/questionnaireHelpers";
import { validateQuestName } from "@/utils/validations";

import withKeyboardDismiss from "@/HOCs/withKeyboardDismiss";
import styles from "../index.module.scss";

interface IProps {
  onNext: () => void;
  onBack: () => void;
  progress: number;
}

const MainContainerWithDismiss = withKeyboardDismiss(MainContainer);

const NameSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<ELocalizationQuestionnaire | "">("");

  const localization = useSelector(getLocalizationQuestionnaire);

  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        personal: { ...state.personal, name },
        step: progress + 1,
      }),
    );

    logEvent(`web_quest_name_on_continue`);

    questFBProgressLog(progress + 1);

    onNext();
  };

  return (
    <MainContainerWithDismiss background="#eef3f9">
      <Box>
        <SelectorHeader
          title={
            localization[
              ELocalizationQuestionnaire.QUEST_PERSONALIZATION_NAME_TITLE
            ]
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_PERSONALIZATION_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          <Field
            value={name}
            onChange={setName}
            error={error ? localization[error] : ""}
            onBlur={(name) => {
              if (validateQuestName(name)) {
                setError(validateQuestName(name));
              } else setError("");
            }}
            placeholder={
              localization[ELocalizationQuestionnaire.ENTER_YOUR_NAME]
            }
          />

          <SelectorFooter
            onClick={handleSubmit}
            disabled={name.length === 0 || error !== ""}
            position={false}
          />
        </Box>
      </Box>
    </MainContainerWithDismiss>
  );
};

export default NameSelector;
