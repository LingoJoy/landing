import { EPayUrls, FB_EVENT } from "@/constants";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";
import { uuid } from "./uuid";


export type Params = { [key: string]: string | number };

export let cachedIp: string | null = null;
export const eventID = uuid();

export const initFacebookSdk = async (appId: string) => {
    try {
        const options = {
            autoConfig: true,
            debug: false,
        };
        ReactPixel.init(appId, undefined, options);
        ReactPixel.pageView();
    } catch (error) {
        console.error(error);
    }
};

export const logFBEvent = (eventName: string, data?: any, email?: string) => {
    ReactPixel.track(eventName, {...data, eventID});
    if(eventName != FB_EVENT.PURCHASE) {
        logFBConventionsEvent(eventName, email, data);
    }
};

export const logFBCustomEvent = (eventName: string) => {
    ReactPixel.trackCustom(eventName);
    // logFBConventionsEvent(eventName);
};


export const logFBConventionsEvent = async (
    eventName: string,
    email?: string,
    data?: any
) => {
    try {
        const ip = await getIpAddress();

        let custom_data: any | null = null;

        if (eventName == FB_EVENT.PURCHASE && data) {
            custom_data = {
                ...(data.currency != null && { currency: data.currency }),
                ...(data.value != null && { value: data.value })
            }
        }

        const { fbp, fbc } = getFbParams();

        const postData = {
            event: {
                action_source: "website",
                event_id: eventID,
                event_name: eventName,
                user_data: {
                    client_ip_address: ip,
                    client_user_agent: window.navigator.userAgent,
                    email,
                    ...(fbp && { fbp }),
                    ...(fbc && { fbc })
                },
                ...(custom_data != null && { custom_data })
            },
        };

        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                Authorization: import.meta.env.VITE_BACKEND_PAY_API_TOKEN,
            },
        };
        await axios.post(
            `${import.meta.env.VITE_BACKEND_PAY_API_URL}${EPayUrls.CONVERSIONS}`,
            postData,
            axiosConfig,
        );
    } catch (error) {
        console.error(error);
    }
};

const getIpAddress = async () => {
    if (!cachedIp) {
        try {
            const response = await axios.get("https://geolocation-db.com/json/");
            cachedIp = response.data.IPv4;
        } catch (error) {
            cachedIp = "0.0.0.0";
        }
    }
    return cachedIp;
};

export const getFbParams = () => {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");

    const fbc = fbclid ? `fb.1.${Date.now()}.${fbclid}` : document.cookie.match(/_fbc=([^;]*)/)?.[1] || null;
    const fbp = document.cookie.match(/_fbp=([^;]*)/)?.[1] || null;

    return { fbp, fbc };
};