import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import PaperBGIcon, {
  PaperBigBGIcon,
} from "@/components/atoms/icons/PaperBGIcon";

import ShieldImage from "@/assets/shield-dynamic-color.png";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const GuaranteePremiumSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.guaranteeContentBox}>
      <Box className={styles.guaranteeWrapper}>
        <Box className={styles.guaranteeBG}>
          <PaperBGIcon height="400px" />
        </Box>
        <Box className={styles.guaranteeWebBG}>
          <PaperBigBGIcon height="450px" />
        </Box>
        <Box className={styles.indexBox}>
          <img src={ShieldImage} alt="" className={styles.guaranteeIcon} />
          <h2 className={styles.guaranteeName}>
            {localization[ELocalizationQuestionnaire.LANDING_GUARANTEE_TITLE]}
          </h2>
          <Box className={styles.guaranteeBox}>
            <p className={styles.guarantee}>
              {
                localization[
                  ELocalizationQuestionnaire.LANDING_GUARANTEE_TEXT_1
                ]
              }{" "}
              <Link to={""}>
                <span className={styles.link}>
                  {
                    localization[
                      ELocalizationQuestionnaire.LANDING_GUARANTEE_RETURN
                    ]
                  }
                </span>
              </Link>{" "}
              {
                localization[
                  ELocalizationQuestionnaire.LANDING_GUARANTEE_TEXT_2
                ]
              }
            </p>
            <p className={styles.guarantee}>
              {
                localization[
                  ELocalizationQuestionnaire.LANDING_GUARANTEE_FIND_MORE
                ]
              }
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GuaranteePremiumSection;
