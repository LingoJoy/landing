import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import AgeSelector from "@/components/organisms/selectBlocks/AgeSelector";
import NameSelector from "@/components/organisms/selectBlocks/NameSelector";
import PersonalizationHero from "@/components/templates/PersonalizationHero";
import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";

import { ERoutes } from "@/constants";

const PersonalizationPage = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const { search } = useLocation();

  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  switch (step) {
    case 1:
      return (
        <NameSelector onNext={handleNext} onBack={handleBack} progress={10} />
      );
    case 2:
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

    default:
      return (
        <QuestionnaireWrapper>
          <PersonalizationHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
  }
};

export default PersonalizationPage;
