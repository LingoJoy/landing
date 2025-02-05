import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import AspectsSelector from "@/components/organisms/selectBlocks/AspectsSelector";
import EnglishEnvironmentSelector from "@/components/organisms/selectBlocks/EnglishEnvironmentSelector";
import LanguageSelector from "@/components/organisms/selectBlocks/LanguageSelector";
import MotivationSelector from "@/components/organisms/selectBlocks/MotivationSelector";
import NotesSelector from "@/components/organisms/selectBlocks/NotesSelector";
import StatementsSelector from "@/components/organisms/selectBlocks/StatementsSelector";

import { ERoutes, IPreloadImagesData } from "@/constants";
import { DEFAULT_PRELOAD_IMAGES_DATA } from "@/constants/data/preloadImages.data";
import { Box } from "@mui/material";

import styles from "./index.module.scss";

const MotivationPage = (): JSX.Element => {
  const [step, setStep] = useState(1);
  const { search } = useLocation();
  const navigate = useNavigate();

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 1));

  useEffect(() => {
    const loadImage = (image: IPreloadImagesData) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();

        loadImg.src = image.icon;
        loadImg.onload = () => resolve(image.icon);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(DEFAULT_PRELOAD_IMAGES_DATA.map(loadImage))
      .then(() => console.log("Images preloaded successfully"))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

  const GetImg = useMemo(
    () => (
      <Box className={styles.hideImages} data-class="hideImages">
        {DEFAULT_PRELOAD_IMAGES_DATA.map((image) => (
          <img key={image.id} src={image.icon} alt="" />
        ))}
      </Box>
    ),
    []
  );

  switch (step) {
    case 2:
      return (
        <>
          <MotivationSelector onNext={handleNext} onBack={handleBack} progress={2} />
          {GetImg}
        </>
      );
    case 3:
      return (
        <>
          <AspectsSelector onNext={handleNext} onBack={handleBack} progress={3} />
          {GetImg}
        </>
      );
    case 4:
      return (
        <>
          <NotesSelector onNext={handleNext} onBack={handleBack} progress={4} />
          {GetImg}
        </>
      );
    case 5:
      return (
        <>
          <EnglishEnvironmentSelector onNext={handleNext} onBack={handleBack} progress={5} />
          {GetImg}
        </>
      );
    case 6:
      return (
        <>
          <StatementsSelector
            onNext={() =>
              navigate({
                pathname: ERoutes.QUESTIONNAIRE_VOCABULARY,
                search,
              })
            }
            onBack={handleBack}
            progress={6}
          />
          {GetImg}
        </>
      );
    default:
      return (
        <QuestionnaireWrapper isNoRedirect>
          <LanguageSelector
            onNext={handleNext}
            onBack={() =>
              navigate({
                pathname: ERoutes.QUESTIONNAIRE_START,
                search,
              })
            }
            progress={1}
          />
          {GetImg}
        </QuestionnaireWrapper>
      );
  }
};

export default MotivationPage;
