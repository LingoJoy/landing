import "@/utils/sentry";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { AlertProvider } from "@/components/organisms/AlertMessage";

import { baselightTheme } from "./theme";
import { router } from "@/routing";
import { initializeAmplitude, logEvent } from "./utils/amplitude";
import {
  initFacebookSdk,
  logFBConventionsEvent,
  logFBEvent,
} from "./utils/facebookSDK";
import { FB_EVENT } from "./constants";
import { getProfile } from "./store/profile";

function App() {
  const profile = useSelector(getProfile);

  useEffect(() => {
    initializeAmplitude(import.meta.env.VITE_AMPLITUDE_API_KEY);
    initFacebookSdk(import.meta.env.VITE_FB_APP_ID);
    logEvent(`web_Activate App`);
    logFBEvent(FB_EVENT.ACTIVE_APP);
    logFBConventionsEvent(FB_EVENT.ACTIVE_APP, profile?.email);
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
