import LandingHero from "@/components/templates/LandingHero";
import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";

const LandingPage = (): JSX.Element => {
  return (
    <QuestionnaireWrapper>
      <LandingHero />
    </QuestionnaireWrapper>
  );
};

export default LandingPage;
