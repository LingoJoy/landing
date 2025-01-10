import { FC } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Stack } from "@mui/material";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

interface IActionSectionProps {
  actionStart: () => void;
  actionSkip: () => void;
}

const ActionSection: FC<IActionSectionProps> = (props) => {
  const {
    actionStart,
    actionSkip,
  } = props;
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.actionWrapper}>
      <Stack className={styles.actionBox}>
        <Button className={styles.actionStart} onClick={actionStart}>
          {localization[ELocalizationQuestionnaire.NEWEST_PREMIUM_ACTION_START]}
        </Button>
        <Button className={styles.actionSkip} onClick={actionSkip}>
          {localization[ELocalizationQuestionnaire.NEWEST_PREMIUM_ACTION_SKIP]}
        </Button>
      </Stack>
    </Box>
  );
};

export default ActionSection;
