import { AppProvider } from "./contexts";
import RouterContainer from "./router/RouterContainer";

function App() {
  return (
    <AppProvider>
      <RouterContainer />
    </AppProvider>
  );
}

export default App;
