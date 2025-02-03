import { Box } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

import DreamsIcon from "@/components/atoms/icons/DreamsIcon";
import LogoIcon from "@/components/atoms/icons/LogoIcon";
import SelectorFooter from "@/components/molecules/SelectorFooter";
import ContentContainer from "@/components/organisms/ContentContainer";

import { ELocalizationQuestionnaire } from "@/constants";
import { ERoutes } from "@/constants/pages";
import { getLocalizationQuestionnaire } from "@/store/localization-questionnaire";
import { getQuestionnaire, setQuestionnaire } from "@/store/questionnaire";

import styles from "./index.module.scss";

interface IProps {
  onNext: () => void;
}

const ChildrenHero: FC<IProps> = ({ onNext }) => {
  const navigate = useNavigate();

  const localization = useSelector(getLocalizationQuestionnaire);
  const [searchParams] = useSearchParams();

  const state = useSelector(getQuestionnaire);
  const dispatch = useDispatch();

  const handleSkip = () => {
    console.log("param", searchParams);
    const queryString = searchParams.toString();
    const targetRoute = `${ERoutes.QUESTIONNAIRE_TIME}${
      queryString ? `?${queryString}` : ""
    }`;
    console.log(targetRoute);
    dispatch(setQuestionnaire({ ...state, step: 15 }));
    navigate(targetRoute);
  };

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.logoBox}>
        <LogoIcon textColor="#fff" width="100px" height="27px" />
      </Box>
      <Box className={styles.ellipseBox}>
        <Box className={styles.ellipse}>
          <DreamsIcon color="#CEE6F1" />
        </Box>
      </Box>
      <Box className={styles.logoWrapper}>
        <img className={styles.logo} src={`${import.meta.env.VITE_BACKEND_IMAGE_URL}chat-text.png`} alt="" />
      </Box>
      <ContentContainer>
        <Box className={styles.contentWrapper}>
          <Box>
            <h2 className={styles.title}>
              {
                localization[
                ELocalizationQuestionnaire.QUEST_CHILDREN_HERO_TITLE
                ]
              }
            </h2>
            <p className={styles.description}>
              {
                localization[
                ELocalizationQuestionnaire.QUEST_CHILDREN_HERO_DESCR
                ]
              }
            </p>
          </Box>
        </Box>
      </ContentContainer>
      <Box className={styles.footerWrapper}>
        <p
          className={`${styles.description} ${styles.shortDescription}`}
          onClick={handleSkip}
        >
          {localization[ELocalizationQuestionnaire.SKIP]}
        </p>
        <SelectorFooter
          onClick={onNext}
          btnText={localization[ELocalizationQuestionnaire.CONNECT]}
        />
      </Box>
    </Box>
  );
};

export default ChildrenHero;
