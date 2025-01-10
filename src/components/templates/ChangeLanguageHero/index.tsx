import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import ContentContainer from "@/components/organisms/ContentContainer";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import SelectorFooter from "@/components/molecules/SelectorFooter";

import SettingsImage from "@/assets/setting-dynamic-color.png";

import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import {
  DEFAULT_QUEST_LANGUAGE_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";

import styles from "./index.module.scss";

interface IProps {
  onChange: () => void;
  onCancel: () => void;
  language: string;
}

const ChangeLanguageHero: FC<IProps> = ({ onChange, onCancel, language }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  const lang =
    DEFAULT_QUEST_LANGUAGE_DATA.find((el) => el.translate === language) ||
    DEFAULT_QUEST_LANGUAGE_DATA[0];

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.ellipseBox}>
        <Box className={styles.ellipse}>
          <DreamsIcon color="#FFE4C8" />
        </Box>
      </Box>
      <Box className={styles.logoWrapper}>
        <img className={styles.logo} src={SettingsImage} alt="" />
      </Box>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box>
            <h2 className={styles.title}>
              {
                localization[
                  ELocalizationQuestionnaire.QUEST_CHANGE_LANGUAGE_TITLE
                ]
              }{" "}
              {localization[lang.title]}?
            </h2>
            <p className={styles.description}>
              {
                localization[
                  ELocalizationQuestionnaire.QUEST_CHANGE_LANGUAGE_SUBTITLE
                ]
              }
            </p>
          </Box>
        </Box>
      </ContentContainer>
      <Box className={styles.footerWrapper}>
        <p
          className={`${styles.description} ${styles.shortDescription}`}
          onClick={onCancel}
        >
          {localization[ELocalizationQuestionnaire.CANCEL]}
        </p>
        <SelectorFooter
          onClick={onChange}
          btnText={localization[ELocalizationQuestionnaire.CHANGE_LANGUAGE]}
        />
      </Box>
    </Box>
  );
};

export default ChangeLanguageHero;
