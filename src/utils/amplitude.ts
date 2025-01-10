import amplitude from 'amplitude-js';

export const initializeAmplitude = (apiKey: string) => {
    amplitude.getInstance().init(apiKey);
};

export const logEvent = (eventName: string,
) => {
    amplitude.getInstance().logEvent(eventName);
};
