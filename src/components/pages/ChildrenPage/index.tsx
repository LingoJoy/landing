import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import ChildrenHero from "@/components/templates/ChildrenHero";
import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";

import { ERoutes } from "@/constants";
import WeekendsSelector from "@/components/organisms/selectBlocks/WeekendsSelector";

const ChildrenPage = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const { search } = useLocation();

  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  switch (step) {
    case 1:
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

    default:
      return (
        <QuestionnaireWrapper>
          <ChildrenHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
  }
};

export default ChildrenPage;
