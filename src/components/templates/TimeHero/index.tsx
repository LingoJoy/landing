import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import ContentContainer from "@/components/organisms/ContentContainer";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import LogoIcon from "@/components/atoms/icons/LogoIcon";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

interface IProps {
  onNext: () => void;
}

const TimeHero: FC<IProps> = ({ onNext }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.ellipse}>
        <DreamsIcon color="#FFE8EE" />
      </Box>
      <Box className={styles.logoWrapper}>
        <img className={styles.logo} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}heart_1.png`} alt="" />
      </Box>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box>
            <h2 className={styles.title}>
              {localization[ELocalizationQuestionnaire.QUEST_TIME_HERO_TITLE]}
            </h2>
            <p className={styles.description}>
              {localization[ELocalizationQuestionnaire.QUEST_TIME_HERO_DESCR]}
            </p>
          </Box>
        </Box>
      </ContentContainer>
      <SelectorFooter onClick={onNext} />
    </Box>
  );
};

export default TimeHero;
