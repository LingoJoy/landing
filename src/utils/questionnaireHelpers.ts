import { FB_EVENT } from "@/constants";
import { logFBCustomEvent } from "./facebookSDK";

export const questFBProgressLog = (progress: number) => {
    logFBCustomEvent(`${FB_EVENT.ACHIEVE_LEVEL}_${progress}`);
    // logFBConventionsEvent(`${FB_EVENT.ACHIEVE_LEVEL}_${progress}`);
};
