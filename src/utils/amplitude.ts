import amplitude from 'amplitude-js';

import { LandingType } from '../constants/pages';
import { logFBCustomEvent } from './facebookSDK';

export const initializeAmplitude = (apiKey: string) => {
    amplitude.getInstance().init(apiKey);
};

export const logEvent = (eventName: string,
) => {
    const getUTMParams = () => {

        const landing = Object.values(LandingType).find(type => window.location.href.includes(type)) || "base";

        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || 'unknown',
            utm_medium: params.get('utm_medium') || 'unknown',
            utm_campaign: params.get('utm_campaign') || 'unknown',
            referrer: document.referrer || 'direct',
            page_url: window.location.href,
            landing
        };
    };

    const utmParams = getUTMParams();

    amplitude.getInstance().setUserProperties(utmParams);
    amplitude.getInstance().logEvent(eventName);

    logFBCustomEvent(eventName);
};
