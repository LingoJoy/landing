import "@/utils/sentry";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { AlertProvider } from "@/components/organisms/AlertMessage";

import { router } from "@/routing";
import { baselightTheme } from "./theme";
import { initializeAmplitude, logEvent } from "./utils/amplitude";
import {
  initFacebookSdk
} from "./utils/facebookSDK";

function App() {

  useEffect(() => {
    const init = async () => {
      await initializeAmplitude(import.meta.env.VITE_AMPLITUDE_API_KEY);
      initFacebookSdk(import.meta.env.VITE_FB_APP_ID);
      logEvent("web_Activate App");
    };
  
    init();
  }, []);

  return (
    <ThemeProvider theme={baselightTheme}>
      <AlertProvider>
        <RouterProvider router={router} />
        <CssBaseline />
      </AlertProvider>
    </ThemeProvider>
  );
}

export default App;
