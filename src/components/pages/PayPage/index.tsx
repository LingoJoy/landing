import { useNavigate } from "react-router";
import { lazy, Suspense, useState } from "react";

const EmbarrassHero = lazy(() => import("@/components/templates/EmbarrassHero"));
const VerbsHero = lazy(() => import("@/components/templates/VerbsHero"));
const CourseHero = lazy(() => import("@/components/templates/CourseHero"));
const PayHero = lazy(() => import("@/components/templates/PayHero/PayHero"));
const QuestionnaireWrapper = lazy(() => import("@/components/organisms/QuestionnaireWrapper"));

import { ERoutes } from "@/constants";

const PayPage = (): JSX.Element => {
  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {(() => {
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
      })()}
    </Suspense>
  );
};

export default PayPage;
