import { LineItem } from "@paddle/paddle-js/types/price-preview/price-preview";

import { DEFAULT_YOUR_PLAN_DATA } from "@/constants";

import { IPlan } from "@/types";

export const parseNumber = (string: string) => parseFloat(string.replace(/^\D|,+/g, ""))

export const updatePriceFormatted = (input: string, oldPrice: string, newPrice: string): string => {
    const regex = new RegExp(oldPrice.replace('.', '\\.'), 'g');
    return input.replace(regex, newPrice);
};

export const createPlan = (
    elements: LineItem[],
    i: number,
    isMostPopular?: boolean,
): IPlan => {
    const el = elements[0];
    const price = parseNumber(el.formattedTotals.subtotal);
    const discount = parseNumber(el.formattedTotals.total);
    const weeks = (el.price.billingCycle?.frequency || 0) * 4;
    const subItem = elements.find((item) => item.price.billingCycle?.interval);
    return {
        id: el.price.id,
        title: el.product.name,
        icon: DEFAULT_YOUR_PLAN_DATA[i].icon,
        price: el.formattedTotals.subtotal,
        discount: el.formattedTotals.total,
        period: "per day",
        periodPrice: updatePriceFormatted(el.formattedTotals.subtotal, `${price}`, ((price - discount) / weeks / 7).toFixed(2)),
        weeks,
        createDate: el.product.createdAt,
        isMostPopular,
        productIds: elements.map((item) => item.price.id),
        billingInterval: subItem ? `${subItem?.price.billingCycle?.frequency} ${subItem?.price.billingCycle?.interval}` : undefined
    };
};
