import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import LeftImage from "@/assets/newest-landing/icons/left-wreath.svg";
import RightImage from "@/assets/newest-landing/icons/right-wreath.svg";
import StarIcon from "@/components/atoms/icons/StarIcon";

import { ELocalizationQuestionnaire } from "@/constants";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";

import styles from "../index.module.scss";

const HeroSection = () => {
  const localization = useSelector(getLocalizationQuestionnaire);

  return (
    <Box className={styles.heroWrapper}>
      <Box className={styles.heroBG}>
        <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}newest-hero-bg.png`} alt="" />
      </Box>
      <Box className={styles.heroBox}>
        <Box className={styles.contentBox}>
          <h1 className={styles.heroTitle}>
            {
              localization[
                ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_TITLE_1
              ]
            }{" "}
            <span>
              {
                localization[
                  ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_TITLE_MORE
                ]
              }
            </span>{" "}
            {
              localization[
                ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_TITLE_2
              ]
            }
          </h1>
          <h4 className={styles.heroSubTitle}>
            {
              localization[
                ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_PRICE_1
              ]
            }
          </h4>
          <h4 className={styles.heroSubBottomTitle}>
            {
              localization[
                ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_PRICE_2
              ]
            }
          </h4>
          <Box className={styles.heroCancelBox}>
            <Box className={styles.heroIconBox}>
              <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}shield-check.svg`} alt=""/>
              <p>
                {
                  localization[
                    ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_CANCEL
                  ]
                }
              </p>
            </Box>
          </Box>
          <p className={styles.heroAvailable}>
            {
              localization[
                ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_AVAILABLE
              ]
            }
          </p>
          <Box className={styles.heroStoreBox}>
            <Box className={styles.heroIconBox}>
              <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}apple_1.svg`} alt=""/>
              {
                localization[
                  ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_APP_STORE
                ]
              }
            </Box>
            <Box className={styles.heroIconBox}>
              <img src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}playstore.svg`} alt=""/>
              {
                localization[
                  ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_GOOGLE_STORE
                ]
              }
            </Box>
          </Box>
          <Box className={styles.heroRatingBox}>
            <LeftImage />
            <RightImage />
            <Box className={styles.heroRatingContent}>
              <Box className={styles.userStarsBox}>
                {new Array(5).fill(undefined).map((_, i) => (
                  <StarIcon size="24px" key={i} />
                ))}
              </Box>
              <p className={styles.userRating}>
                <span>4.96</span>{" "}
                {
                  localization[
                    ELocalizationQuestionnaire.NEWEST_PREMIUM_HERO_RATING
                  ]
                }
              </p>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
