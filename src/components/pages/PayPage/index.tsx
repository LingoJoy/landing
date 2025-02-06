import { useState } from "react";

import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import CourseHero from "@/components/templates/CourseHero";
import EmbarrassHero from "@/components/templates/EmbarrassHero";
import PayHero from "@/components/templates/PayHero/PayHero";
import VerbsHero from "@/components/templates/VerbsHero";

import { ERoutes } from "@/constants";

const PayPage = (): JSX.Element => {
  const [step, setStep] = useState(0);

  const handleNext = () => setStep((prevStep) => Math.min(prevStep + 1, 3));
  const handleNavigate = (route: string) => {
    window.location.href = route;
  };

  switch (step) {
    case 0:
      return (
        <QuestionnaireWrapper>
          <EmbarrassHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
    case 1:
      return <VerbsHero onNext={handleNext} />;
    case 2:
      return <CourseHero onNext={handleNext} />;
    default:
      return <PayHero onNext={() => handleNavigate(ERoutes.SIGN_UP)} />;
  }
};

export default PayPage;
