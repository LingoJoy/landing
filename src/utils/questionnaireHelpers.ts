import { FB_EVENT } from "@/constants";
import { logFBConventionsEvent, logFBEvent } from "./facebookSDK";

export const questFBProgressLog = (progress: number) => {
    logFBEvent(`${FB_EVENT.ACHIEVE_LEVEL}_${progress}`);

    logFBConventionsEvent(`${FB_EVENT.ACHIEVE_LEVEL}_${progress}`);
};
