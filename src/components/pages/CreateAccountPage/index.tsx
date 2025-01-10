import CreateAccountForm from "@/components/organisms/forms/CreateAccountForm";
import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";

const CreateAccountPage = (): JSX.Element => {
  return (
    <QuestionnaireWrapper>
      <CreateAccountForm />
    </QuestionnaireWrapper>
  );
};

export default CreateAccountPage;
