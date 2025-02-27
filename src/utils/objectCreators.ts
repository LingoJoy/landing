import { LineItem } from "@paddle/paddle-js/types/price-preview/price-preview";

import { DEFAULT_YOUR_PLAN_DATA } from "@/constants";

import { IPlan } from "@/types";

export const parseNumber = (string: string) => parseFloat(string.replace(/^\D|,+/g, ""))

export const updatePriceFormatted = (input: string, newPrice: string): string => {
    const oldPrice = input.match(/[\d,.]+/)?.[0] || '';
    if (!oldPrice) return input;

    const regex = new RegExp(oldPrice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    return input.replace(regex, newPrice);
};

export const createPlan = (
    elements: LineItem[],
    i: number,
    isMostPopular?: boolean,
): IPlan => {
    const el = elements[0];
    let weeks = 0;
    switch(el.price.billingCycle?.interval) {
        case "month":
            weeks = (el.price.billingCycle?.frequency || 0) * 4;
            break;
        case "week":
            weeks = el.price.billingCycle?.frequency;
            break;
        case "year":
            weeks = el.price.billingCycle?.frequency * 61;
            break;
        default:
            weeks = 1;
    }
    const subItem = elements.find((item) => item.price.billingCycle?.interval);
    const discount = subItem ? parseNumber(subItem.formattedTotals.total) : parseNumber(el.formattedTotals.total);
    const priceWithoutDiscount = subItem ? parseNumber(subItem.formattedTotals.subtotal) : parseNumber(el.formattedTotals.subtotal);
    const discountID = elements
        .flatMap((val) => val.discounts ?? [])
        .map((a) => a.discount?.id)
        .find((id) => id !== undefined);

    const periodPriceWithoutDiscount = updatePriceFormatted(el.formattedTotals.subtotal, (priceWithoutDiscount / (weeks * 7)).toFixed(2));
    const tax = (parseNumber(el.formattedTotals.subtotal) + (parseNumber(el.formattedTotals.subtotal) * parseNumber(el.taxRate))).toFixed(2);
    return {
        id: el.price.id,
        title: el.product.name,
        icon: DEFAULT_YOUR_PLAN_DATA[i].icon,
        price: updatePriceFormatted(el.formattedTotals.subtotal, `${tax}`),
        discount: el.formattedTotals.total,
        period: "per day",
        periodPrice: updatePriceFormatted(el.formattedTotals.subtotal, (discount / (weeks * 7)).toFixed(2)),
        weeks,
        createDate: el.product.createdAt,
        isMostPopular,
        productIds: elements.map((item) => item.price.id),
        billingInterval: subItem ? `${subItem?.price.billingCycle?.frequency} ${subItem?.price.billingCycle?.interval}` : undefined,
        discountID,
        periodPriceWithoutDiscount
    };
};
