import { LineItem } from "@paddle/paddle-js/types/price-preview/price-preview";

import { DEFAULT_YOUR_PLAN_DATA } from "@/constants";

import { IPlan } from "@/types";

export const parseNumber = (string: string) => parseFloat(string.replace(/^\D|,+/g, ""))

export const createPlan = (
    el: LineItem,
    i: number,
    isMostPopular?: boolean,
): IPlan => {
    const price = parseNumber(el.formattedTotals.subtotal);
    const discount = parseNumber(el.formattedTotals.total);
    const weeks = (el.price.billingCycle?.frequency || 0) * 4;

    return {
        id: el.price.id,
        title: el.product.name,
        icon: DEFAULT_YOUR_PLAN_DATA[i].icon,
        price: price,
        discount,
        period: "per day",
        periodPrice: ((price - discount) / weeks / 7).toFixed(2),
        weeks,
        createDate: el.product.createdAt,
        isMostPopular,
    };
};
