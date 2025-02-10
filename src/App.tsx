import "@/utils/sentry";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { AlertProvider } from "@/components/organisms/AlertMessage";

import { router } from "@/routing";
import { FB_EVENT } from "./constants";
import { getProfile } from "./store/profile";
import { baselightTheme } from "./theme";
import { initializeAmplitude, logEvent } from "./utils/amplitude";
import {
  initFacebookSdk,
  logFBEvent
} from "./utils/facebookSDK";

function App() {
  const profile = useSelector(getProfile);

  useEffect(() => {
    initializeAmplitude(import.meta.env.VITE_AMPLITUDE_API_KEY);
    initFacebookSdk(import.meta.env.VITE_FB_APP_ID);
    logEvent(`web_Activate App`);
    logFBEvent(FB_EVENT.ACTIVE_APP, null, profile?.email);
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
