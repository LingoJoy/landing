import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import AgeSelector from "@/components/organisms/selectBlocks/AgeSelector";
import NameSelector from "@/components/organisms/selectBlocks/NameSelector";
import PersonalizationHero from "@/components/templates/PersonalizationHero";

import { ERoutes } from "@/constants";

const PersonalizationPage = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const { search } = useLocation();

  const navigate = useNavigate();

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 2));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  switch (step) {
    case 0:
      return (
        <QuestionnaireWrapper>
          <PersonalizationHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
    case 1:
      return (
        <NameSelector onNext={handleNext} onBack={handleBack} progress={10} />
      );
    default:
      return (
        <AgeSelector
          onNext={() => navigate({
            pathname: ERoutes.QUESTIONNAIRE_CHILDREN,
            search,
          })}
          onBack={handleBack}
          progress={11}
        />
      );
  }
};

export default PersonalizationPage;
