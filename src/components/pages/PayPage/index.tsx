import { useState } from "react";

import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import CourseHero from "@/components/templates/CourseHero";
import EmbarrassHero from "@/components/templates/EmbarrassHero";
import PayHero from "@/components/templates/PayHero/PayHero";
import VerbsHero from "@/components/templates/VerbsHero";

import { ERoutes } from "@/constants";

const PayPage = (): JSX.Element => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep(step + 1);
  const handleNavigate = (route: string) => {
    window.location.href = route;
  };

  switch (step) {
    case 1:
      return <VerbsHero onNext={handleNext} />;
    case 2:
      return <CourseHero onNext={handleNext} />;
    case 3:
      return <PayHero onNext={() => handleNavigate(ERoutes.SIGN_UP)} />;
    default:
      return (
        <QuestionnaireWrapper>
          <EmbarrassHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
  }
};

export default PayPage;
