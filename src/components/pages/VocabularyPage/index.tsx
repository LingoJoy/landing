import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import VocabularySelector from "@/components/organisms/selectBlocks/VocabularySelector";
import VocabularyHero from "@/components/templates/VocabularyHero";

import {
  DEFAULT_A_LEVEL_DATA,
  DEFAULT_B1_LEVEL_DATA,
  DEFAULT_B2_LEVEL_DATA,
  ERoutes,
  IPreloadImagesData,
} from "@/constants";
import { getQuestionnaire } from "@/store/questionnaire";
import { Box } from "@mui/material";

import { DEFAULT_PRELOAD_IMAGES_DATA } from "@/constants/data/preloadImages.data";
import styles from "./index.module.scss";

const VocabularyPage = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const { search } = useLocation();

  const navigate = useNavigate();

  const state = useSelector(getQuestionnaire);

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  const GetImg = useMemo(() => {
    return (
      <Box className={styles.hideImages} data-class="hideImages">
        {DEFAULT_PRELOAD_IMAGES_DATA.map((image) => (
          <img key={image.id} src={image.icon} alt="" />
        ))}
      </Box>
    )
  }, []);

  useEffect(() => {
    const loadImage = (image: IPreloadImagesData) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image.icon
        loadImg.onload = () =>
          resolve(image.icon);

        loadImg.onerror = err => reject(err);
      })
    };

    Promise.all(DEFAULT_PRELOAD_IMAGES_DATA.map((image) => loadImage(image)))
      .then(() => {})
      .catch(err => console.log("Failed to load images", err))
  }, [])

  switch (step) {
    case 0:
      return (
        <QuestionnaireWrapper>
          <VocabularyHero onNext={handleNext} />
          {GetImg}
        </QuestionnaireWrapper>
      );
    case 1:
      return (
        <VocabularySelector
          onNext={handleNext}
          onBack={handleBack}
          progress={7}
          vocabularyData={state.vocabulary.a}
          storeKey="a"
          levelData={DEFAULT_A_LEVEL_DATA}
        />
      );
    case 2:
      return (
        <VocabularySelector
          onNext={handleNext}
          onBack={handleBack}
          progress={8}
          vocabularyData={state.vocabulary.b1}
          storeKey="b1"
          levelData={DEFAULT_B1_LEVEL_DATA}
        />
      );
    default:
      return (
        <VocabularySelector
          onNext={() => navigate({
            pathname: ERoutes.QUESTIONNAIRE_PERSONALIZATION,
            search,
          })}
          onBack={handleBack}
          progress={9}
          vocabularyData={state.vocabulary.b2}
          storeKey="b2"
          levelData={DEFAULT_B2_LEVEL_DATA}
        />
      );
  }
};

export default VocabularyPage;
