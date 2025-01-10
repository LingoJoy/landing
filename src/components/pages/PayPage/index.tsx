import { useNavigate } from "react-router";
import { useState } from "react";

import EmbarrassHero from "@/components/templates/EmbarrassHero";
import VerbsHero from "@/components/templates/VerbsHero";
import CourseHero from "@/components/templates/CourseHero";
import PayHero from "@/components/templates/PayHero/PayHero";
import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";

import { ERoutes } from "@/constants";

const PayPage = (): JSX.Element => {
  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);

  switch (step) {
    case 1:
      return <VerbsHero onNext={handleNext} />;
    case 2:
      return <CourseHero onNext={handleNext} />;
    case 3:
      return <PayHero onNext={() => navigate(ERoutes.SIGN_UP)} />;

    default:
      return (
        <QuestionnaireWrapper>
          <EmbarrassHero onNext={handleNext} />
        </QuestionnaireWrapper>
      );
  }
};

export default PayPage;
