import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import ContentContainer from "@/components/organisms/ContentContainer";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";

import {
  DEFAULT_A_LEVEL_DATA,
  DEFAULT_B1_LEVEL_DATA,
  DEFAULT_B2_LEVEL_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getQuestionnaire } from "@/store/questionnaire";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

interface IProps {
  onNext: () => void;
}

const PersonalizationHero: FC<IProps> = ({ onNext }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const state = useSelector(getQuestionnaire);
  const { vocabulary } = state;

  const percent =
    ((vocabulary.a.length + vocabulary.b1.length + vocabulary.b2.length) /
      (DEFAULT_A_LEVEL_DATA.length +
        DEFAULT_B1_LEVEL_DATA.length +
        DEFAULT_B2_LEVEL_DATA.length)) *
    100;

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.ellipseBox}>
        <Box className={styles.ellipse}>
          <DreamsIcon color="#FFEDD4" />
        </Box>
      </Box>
      <Box className={styles.logoWrapper}>
        <img className={styles.logo} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}thumb-up.png`} alt="" />
        <img className={styles.logoWeb} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}thumb-up-web.png`} alt="" />
      </Box>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box>
            <p className={styles.percentage}>{percent.toFixed()}%</p>
            <Box className={styles.chip}>
              {
                localization[
                  ELocalizationQuestionnaire.QUEST_PERSONALIZATION_HERO_CHIP
                ]
              }
            </Box>
            <h2 className={styles.title}>
              {
                localization[
                  ELocalizationQuestionnaire.QUEST_PERSONALIZATION_HERO_TITLE
                ]
              }
            </h2>
            <p className={styles.description}>
              {
                localization[
                  ELocalizationQuestionnaire.QUEST_PERSONALIZATION_HERO_DESCR_1
                ]
              }
              <br />
              {
                localization[
                  ELocalizationQuestionnaire.QUEST_PERSONALIZATION_HERO_DESCR_2
                ]
              }
            </p>
          </Box>
        </Box>
      </ContentContainer>
      <SelectorFooter onClick={onNext} />
    </Box>
  );
};

export default PersonalizationHero;
