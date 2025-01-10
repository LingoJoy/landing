import { EPayUrls } from "@/constants";
import axios from "axios";
import ReactPixel from "react-facebook-pixel";

import { uuid } from "./uuid";

export type Params = { [key: string]: string | number };

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

export const logFBEvent = (eventName: string, ...args: unknown[]) => {
    ReactPixel.track(eventName, ...args);

    logFBConventionsEvent(eventName);
};

export const logFBConventionsEvent = async (
    eventName: string,
    email?: string,
) => {
    try {
        const ip = await axios.get("https://geolocation-db.com/json/");

        const postData = {
            event: {
                action_source: "website",
                event_id: uuid(),
                event_name: eventName,
                user_data: {
                    client_ip_address: ip.data.IPv4,
                    client_user_agent: window.navigator.userAgent,
                    email,
                },
            },
            test_event_code: "TEST72679",
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
