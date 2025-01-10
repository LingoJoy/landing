import FactHero from "@/components/templates/FactHero";
import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";

const FactPage = (): JSX.Element => {
  return (
    <QuestionnaireWrapper>
      <FactHero />
    </QuestionnaireWrapper>
  );
};

export default FactPage;
