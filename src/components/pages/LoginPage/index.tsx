import LoginForm from "@/components/organisms/forms/LoginForm";
import QuestionnaireWrapper from "@/components/organisms/QuestionnaireWrapper";

const LoginPage = (): JSX.Element => {
  return (
    <QuestionnaireWrapper isNoRedirect>
      <LoginForm />
    </QuestionnaireWrapper>
  );
};

export default LoginPage;
