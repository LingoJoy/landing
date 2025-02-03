import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const GuaranteeSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.guaranteeWrapper}>
      <Box className={styles.contentBox}>
        <Box className={styles.indexBox}>
          <Box className={styles.titleWrapper}>
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}handshake.svg`} alt=""/>
            <h2 className={styles.guaranteeTitle}>
              {localization[ELocalizationQuestionnaire.LANDING_GUARANTEE_TITLE]}
            </h2>
          </Box>
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
          <Box className={styles.refundsBox}>
            <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}shield-check.svg`} alt=""/>
            <p>
              {
                localization[
                  ELocalizationQuestionnaire.NEW_LANDING_REFUNDS_TITLE
                ]
              }
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GuaranteeSection;
