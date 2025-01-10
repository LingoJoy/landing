import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import CupImage from "@/assets/icons/cup.svg";
import FireImage from "@/assets/main/fire.png";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const PriceSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.priceWrapper}>
      <Box className={styles.chipWrapper}>
        <CupImage />
        <p>{localization[ELocalizationQuestionnaire.PREMIUM_PRICE_CHIP]}</p>
      </Box>
      <h2 className={styles.priceTitle}>
        {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_TITLE]}
      </h2>
      <Box className={styles.contentBox}>
        <Box className={styles.priceBox}>
          <Box className={styles.oldPriceBox}>
            <p className={styles.oldPriceTitle}>
              {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_OLD_TITLE]}
            </p>
            <p className={styles.oldPrice}>
              $39.99/{" "}
              {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_MONTH]}
            </p>
          </Box>
          <Box className={styles.newPriceBox}>
            <Box className={styles.newPriceTitleBox}>
              <p>
                {
                  localization[
                    ELocalizationQuestionnaire.PREMIUM_PRICE_NEW_TITLE
                  ]
                }
              </p>
              <img src={FireImage} alt="" />
              <img src={FireImage} alt="" />
            </Box>
            <p className={styles.newPrice}>
              $19.99/{" "}
              {localization[ELocalizationQuestionnaire.LANDING_YOUR_PLAN_MONTH]}
            </p>
            <p>
              7-
              {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_TRIAL]} $1
            </p>
          </Box>
          <Box className={styles.discountBox}>
            <p>
              50% {localization[ELocalizationQuestionnaire.PREMIUM_PRICE_OFF]}
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PriceSection;
