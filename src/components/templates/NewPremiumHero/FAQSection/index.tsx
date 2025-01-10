import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Accordion from "@/components/atoms/Accordion";

import {
  DEFAULT_PREMIUM_FAQ_DATA,
  ELocalizationQuestionnaire,
} from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const FAQSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.faqWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.titleWrapper}>
          <h2 className={styles.title}>
            {localization[ELocalizationQuestionnaire.NEW_PREMIUM_FAQ_TITLE]}
          </h2>
        </Box>
        <Box className={styles.faqBox}>
          <Accordion
            data={DEFAULT_PREMIUM_FAQ_DATA.map((el) => ({
              answer: localization[el.description],
              question: localization[el.title],
            }))}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FAQSection;
