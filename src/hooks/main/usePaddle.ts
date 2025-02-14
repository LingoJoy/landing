import {
    CheckoutSettings,
    initializePaddle,
    Paddle,
    PricePreviewResponse
} from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FB_EVENT } from "@/constants";
import { getLocation, getProfile, ILocation } from "@/store/profile";
import { getQuestionnaire } from "@/store/questionnaire";
import { logEvent } from "@/utils/amplitude";
import { logFBEvent } from "@/utils/facebookSDK";
import CryptoJS from "crypto-js";

const checkoutSettings: CheckoutSettings = {
    displayMode: "inline",
    frameTarget: "checkout-container",
    frameStyle:
        "width: 100%; min-width: 312px; background-color: transparent; border: none;",
    variant: 'multi-page',
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
                    locale: location?.country_code,
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
                        logEvent(`web_paddle_${event.data?.items.length}_${event.data?.status}`);

                        let product = event.data?.items[0];
                        if (event.data && event.data.items.length > 1) {
                            product = event.data?.items[1]
                        }

                        logFBEvent(FB_EVENT.PURCHASE, { value: product?.totals.total, currency: event.data?.currency_code }, profile?.email || "");

                        const transactionId = event.data?.id;
                        if (transactionId) {
                            const SECRET = import.meta.env.VITE_CRYPTO_SECRET_KEY;
                            const encryptedId = CryptoJS.AES.encrypt(transactionId, SECRET).toString();
                            const storedData = localStorage.getItem("transactionSet");
                            const transactionSet = storedData ? new Set(JSON.parse(storedData)) : new Set();

                            transactionSet.add(encryptedId);

                            localStorage.setItem("transactionSet", JSON.stringify([...transactionSet]));
                        }
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
        totalPrice?: string,
    ) => {
        const SUCCESS_URL = `${window.location.origin}${successUrl || ''}`;
        const email = profile?.email || state?.email;

        const items: { priceId: string; quantity: number }[] = Array.isArray(priceIds)
            ? priceIds.map((id) => ({ priceId: id, quantity: 1 }))
            : [{ priceId: priceIds, quantity: 1 }];

        const locale: ILocation | null = validateCurrencyCode(location?.currency?.code) == true ? location : null;

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
                locale: locale?.country_code,
                showAddDiscounts: false,
                showAddTaxId: false
            },
            items: items,
            discountId,
            customer: {
                email: email || " ",
                address: {
                    countryCode: locale?.country_code || "",
                    postalCode: locale?.zip || ""
                },
            },
        });

        if (totalPrice) {
            logFBEvent(FB_EVENT.INITIATE_CHECKOUT, { currency: locale ? location?.currency?.code : "USD", value: parseFloat(totalPrice.replace(/^\D|,+/g, "")) }, profile?.email || "");
        }
    };
    const closeCheckout = async () => {
        paddle?.Checkout.close();
    };

    const getPrices = async (
        paddle: Paddle | undefined,
        price: any,
    ) => {

        const locale: ILocation | null = validateCurrencyCode(location?.currency?.code) == true ? location : null;

        let priceParams = price;
        if (locale) {
            priceParams = {
                ...price,
                address: {
                    countryCode: locale?.country_code,
                    postalCode: locale?.zip
                },
                currencyCode: locale?.currency?.code || null
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

    function validateCurrencyCode(code?: string): boolean {
        if (!code) { return false }

        const validCodes: string[] = [
            'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'HKD',
            'SGD', 'SEK', 'ARS', 'BRL', 'CNY', 'COP', 'CZK', 'DKK',
            'HUF', 'ILS', 'INR', 'KRW', 'MXN', 'NOK', 'NZD', 'PLN',
            'RUB', 'THB', 'TRY', 'TWD', 'UAH', 'ZAR'
        ];

        return validCodes.includes(code);
    }

    const getStatus = () => statusTransaction;

    return { openCheckout, paddle, getPrices, isClosed, getStatus, closeCheckout };
}
