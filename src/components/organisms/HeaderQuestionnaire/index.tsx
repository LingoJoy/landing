import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material";

import LogoIcon from "@/components/atoms/icons/LogoIcon";

import { ELocalizationQuestionnaire, ERoutes } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

const HeaderQuestionnaire: FC<IProps> = ({ children, onClick }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoBox}>
        <Link to={ERoutes.QUESTIONNAIRE_START}>
          <LogoIcon textColor="#fff" width="100px" height="27px" />
        </Link>
      </Box>
      <Box className={styles.logoWrapper}>
        <Link to={ERoutes.QUESTIONNAIRE_START}>
          <LogoIcon />
        </Link>
      </Box>
      <Box className={styles.box}>
        {children}
        <Button
          onClick={onClick}
          sx={{ display: "flex" }}
          className={styles.button}
        >
          {localization[ELocalizationQuestionnaire.LANDING_HEADER_BTN]}
        </Button>
      </Box>
    </Box>
  );
};

export default HeaderQuestionnaire;
