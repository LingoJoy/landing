import {
    CheckoutSettings,
    initializePaddle,
    Paddle,
    PricePreviewParams,
    PricePreviewResponse,
} from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FB_EVENT } from "@/constants";
import { getLocation, getProfile } from "@/store/profile";
import { getQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import { logFBConventionsEvent, logFBEvent } from "@/utils/facebookSDK";

const checkoutSettings: CheckoutSettings = {
    displayMode: "inline",
    frameTarget: "checkout-container",
    frameStyle:
        "width: 100%; min-width: 312px; background-color: transparent; border: none;",
    variant: 'one-page',
};

export function usePaddle(redirectUrl?: string) {
    const [paddle, setPaddle] = useState<Paddle>();
    const [isClosed, setIsClosed] = useState(false);
    const [statusTransaction, setStatusTransaction] = useState('');

    const profile = useSelector(getProfile);
    const location = useSelector(getLocation);

    const navigate = useNavigate();

    useEffect(() => {
        initializePaddle({
            // environment: "sandbox",
            token: import.meta.env.VITE_PADDLE_TOKEN || "No env",
            checkout: {
                settings: {
                    ...checkoutSettings,
                },
            },
            eventCallback(event) {
                if (event.data?.status) {
                    setStatusTransaction(event.data?.status);
                }
                switch (event.name) {
                    case "checkout.closed":
                        setIsClosed(true);
                        setStatusTransaction('');
                        setTimeout(() => setIsClosed(false), 100);
                        return;
                    case "checkout.completed":
                        logEvent(`web_paddle_${event.data?.items}_${event.data?.status}`);
                        logFBEvent(FB_EVENT.SUBSCRIBE, event.data);
                        logFBConventionsEvent(FB_EVENT.SUBSCRIBE, profile?.email || "");

                        return;
                    default:
                        return;
                }
            },
        }).then((paddleInstance: Paddle | undefined) => {
            if (paddleInstance) {
                setPaddle(paddleInstance);
            }
        });
    }, []);

    useEffect(() => {
        if (isClosed && redirectUrl) navigate(redirectUrl);
    }, [isClosed]);
    const state = useSelector(getQuestionnaire);

    const openCheckout = async (
        priceIds: string[] | string,
        discountId?: string,
        successUrl?: string,
    ) => {
        const SUCCESS_URL = `${window.location.origin}${successUrl || ''}`;
        const email = profile?.email || state?.email;

        const items: { priceId: string; quantity: number }[] = Array.isArray(priceIds)
            ? priceIds.map((id) => ({ priceId: id, quantity: 1 }))
            : [{ priceId: priceIds, quantity: 1 }];

        // console.log(location, email, priceIds, items, SUCCESS_URL);

        if (!email) {
            paddle?.Update({
                checkout: {
                    settings: {
                        ...checkoutSettings,
                        variant: 'multi-page',
                    }
                }
            })
        }

        paddle?.Checkout.open({
            settings: {
                successUrl: SUCCESS_URL,
            },
            items: items,
            discountId,
            customer: {
                email: email || " ",
                address: {
                    countryCode: location?.country_code || "",
                    postalCode: location?.zip || "",
                },
            },
        });
    };
    const closeCheckout = async () => {
        paddle?.Checkout.close();
    };

    const getPrices = async (
        paddle: Paddle | undefined,
        price: PricePreviewParams,
    ) => {

        let priceParams = price;
        if (location) {
            priceParams = {
                ...price,
                address: {
                    countryCode: location?.country_code,
                },
            };
        }

        try {
            const data: PricePreviewResponse | undefined = await paddle?.PricePreview(
                priceParams,
            );

            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const getStatus = () => statusTransaction;

    return { openCheckout, paddle, getPrices, isClosed, getStatus, closeCheckout };
}
