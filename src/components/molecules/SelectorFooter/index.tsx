import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import PulseButton from "@/components/atoms/PulseButton";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

interface IProps {
  onClick: () => void;
  btnText?: ReactNode;
  disabled?: boolean;
}

const SelectorFooter: FC<IProps> = ({ onClick, disabled, btnText }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const text = btnText
    ? btnText
    : localization[ELocalizationQuestionnaire.CONTINUE];

  return (
    <Box className={styles.footerWrapper}>
      <Box className={styles.webWrapper}>
        <PulseButton onClick={onClick} disabled={disabled}>
          {text}
        </PulseButton>
      </Box>
    </Box>
  );
};

export default SelectorFooter;
