import { User } from "@/store/auth/query";

export interface IError extends Error {
  status: number;
}

export interface IPlan {
  id: string;
  title: string;
  icon?: string;
  price: string;
  discount?: string;
  thenPrice?: string;
  period: string;
  periodPrice: number | string;
  periodDiscount?: number;
  weeks: number;
  isFourWeek?: boolean;
  isMostPopular?: boolean;
  createDate?: string;
  priceId?: string;
  productIds: string[];
  billingInterval?: string;
  priceDetail?: string;
  discountID?: string;
  periodPriceWithoutDiscount?: string;
  discountFormmated?: number;
  thenPriceWithoutDiscount?: string;
}

export type TProfileResponse = {
  data: {
    access_token: string;
    user: User;
  };
};
