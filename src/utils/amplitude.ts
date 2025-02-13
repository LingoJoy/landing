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
            utm_content: params.get('utm_content') || 'unknown',
            utm_campaign_id: params.get('utm_campaign_id') || 'unknown',
            utm_adset_id: params.get('utm_adset_id') || 'unknown',
            utm_ad_id: params.get('utm_ad_id') || 'unknown',
            utm_adset_name: params.get('utm_adset_name') || 'unknown',
            utm_placement: params.get('utm_placement') || 'unknown',
            site_source_name: params.get('site_source_name') || 'unknown',
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
