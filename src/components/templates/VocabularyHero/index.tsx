import { FC } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import SelectorFooter from "@/components/molecules/SelectorFooter";
import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import LogoIcon from "@/components/atoms/icons/LogoIcon";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "./index.module.scss";

interface IProps {
  onNext: () => void;
}

const VocabularyHero: FC<IProps> = ({ onNext }) => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoWrapper}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.ellipseBox}>
        <Box className={styles.ellipse}>
          <DreamsIcon />
        </Box>
      </Box>
      <img className={styles.logo} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}notebook.png`} alt="" />
      <Box className={styles.contentWrapper}>
        <Box>
          <h2 className={styles.title}>
            {
              localization[
                ELocalizationQuestionnaire.QUEST_VOCABULARY_HERO_TITLE_1
              ]
            }

            <br />
            {
              localization[
                ELocalizationQuestionnaire.QUEST_VOCABULARY_HERO_TITLE_2
              ]
            }
          </h2>
          <p className={styles.description}>
            {
              localization[
                ELocalizationQuestionnaire.QUEST_VOCABULARY_HERO_DESCR_1
              ]
            }
            <br />{" "}
            {
              localization[
                ELocalizationQuestionnaire.QUEST_VOCABULARY_HERO_DESCR_2
              ]
            }
          </p>
        </Box>
      </Box>
      <SelectorFooter onClick={onNext} />
    </Box>
  );
};

export default VocabularyHero;
