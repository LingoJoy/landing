import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import ChildrenHero from "@/components/templates/ChildrenHero";

import WeekendsSelector from "@/components/organisms/selectBlocks/WeekendsSelector";
import { ERoutes } from "@/constants";

const ChildrenPage = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const { search } = useLocation();

  const navigate = useNavigate();

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 1));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  switch (step) {
    case 0:
      return (
        <QuestionnaireWrapper>
          <ChildrenHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
      
    default:
      return (
        <WeekendsSelector
          onNext={() => navigate({
            pathname: ERoutes.QUESTIONNAIRE_TIME,
            search,
          })}
          onBack={handleBack}
          progress={12}
        />
      );
  }
};

export default ChildrenPage;
