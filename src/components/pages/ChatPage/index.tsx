import AuthContainer from "@/components/organisms/AuthContainer";
import Chat from "@/components/templates/Chat";

const ChatPage = (): JSX.Element => {
  return (
    <AuthContainer>
      <Chat />
    </AuthContainer>
  );
};

export default ChatPage;
