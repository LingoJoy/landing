import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";
import StartHero from "@/components/templates/StartHero";

const StartPage = (): JSX.Element => {
  return (
    <QuestionnaireWrapper isNoRedirect>
      <StartHero />
    </QuestionnaireWrapper>
  );
};

export default StartPage;
