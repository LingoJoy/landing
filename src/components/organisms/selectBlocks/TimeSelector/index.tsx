import { Box } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SelectorFooter from "@/components/molecules/SelectorFooter";
import SelectorHeader from "@/components/molecules/SelectorHeader";
import MainContainer from "@/components/organisms/MainContainer";
import SwipeTime from "../../SwipeTime";

import { DEFAULT_TIME_DATA, ELocalizationQuestionnaire } from "@/constants";
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

const TimeSelector: FC<IProps> = ({ onNext, onBack, progress }) => {
  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const localization = useSelector(getLocalizationQuestionnaire);

  const [from, setFrom] = useState("09:00");
  const [to, setTo] = useState("21:00");

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

  const handleOption = () => {
    dispatch(
      setQuestionnaire({
        ...state,
        time: {
          ...state.time,
          time: {
            from,
            to,
          },
        },
        step: progress + 1,
      }),
    );

    questFBProgressLog(progress + 1);

    logEvent(`web_quest_time_on_continue`);

    onNext();
  };

  return (
    <MainContainer background="#eef3f9" data-class="TimePage-TimeSelector">
      <Box>
        <SelectorHeader
          title={
            <span className={styles.titleSmall}>
              {localization[ELocalizationQuestionnaire.QUEST_TIME_TITLE]}
            </span>
          }
          progressTitle={
            localization[ELocalizationQuestionnaire.QUEST_PERSONALIZATION_DESCR]
          }
          onBack={handleBack}
        />
        <Box className={styles.selectorWrapper}>
          <Box className={styles.timeWrapper}>
            <SwipeTime
              data={DEFAULT_TIME_DATA}
              name={"From"}
              onIndex={(index) => setFrom(DEFAULT_TIME_DATA[index])}
              defaultValue="09:00"
            />
            <SwipeTime
              data={DEFAULT_TIME_DATA}
              name={"To"}
              onIndex={(index) => setTo(DEFAULT_TIME_DATA[index])}
              defaultValue="21:00"
            />
          </Box>
        </Box>
      </Box>
      <SelectorFooter onClick={handleOption} />
    </MainContainer>
  );
};

export default TimeSelector;
