import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import ActivitiesSelector from "@/components/organisms/selectBlocks/ActivitiesSelector";
import HowMuchSelector from "@/components/organisms/selectBlocks/HowMuchSelector";
import HowOftenSelector from "@/components/organisms/selectBlocks/HowOftenSelector";
import TimeSelector from "@/components/organisms/selectBlocks/TimeSelector";
import TopicsSelector from "@/components/organisms/selectBlocks/TopicsSelector";
import TimeHero from "@/components/templates/TimeHero";

import { ERoutes } from "@/constants";

const TimePage = (): JSX.Element => {
  const [step, setStep] = useState(0);
  const { search } = useLocation();

  const navigate = useNavigate();

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 5));
  const handleBack = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  switch (step) {
    case 0:
      return (
        <QuestionnaireWrapper>
          <TimeHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
    case 1:
      return (
        <TimeSelector onNext={handleNext} onBack={handleBack} progress={13} />
      );
    case 2:
      return (
        <HowOftenSelector
          onNext={handleNext}
          onBack={handleBack}
          progress={14}
        />
      );
    case 3:
      return (
        <HowMuchSelector
          onNext={handleNext}
          onBack={handleBack}
          progress={15}
        />
      );
    case 4:
      return (
        <TopicsSelector onNext={handleNext} onBack={handleBack} progress={16} />
      );
    default:
      return (
        <ActivitiesSelector
          onNext={() => navigate({
            pathname: ERoutes.QUESTIONNAIRE_ANALYZE,
            search,
          })}
          onBack={handleBack}
          progress={17}
        />
      );
  }
};

export default TimePage;
