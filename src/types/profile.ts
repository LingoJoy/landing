import { User } from "@/store/auth/query";

export interface IError extends Error {
  status: number;
}

export interface IPlan {
  id: string;
  title: string;
  icon?: string;
  price: number;
  discount?: number;
  thenPrice?: number;
  period: string;
  periodPrice: number | string;
  periodDiscount?: number;
  weeks: number;
  isFourWeek?: boolean;
  isMostPopular?: boolean;
  createDate?: string;
  priceId?: string;
}

export type TProfileResponse = {
  data: {
    access_token: string;
    user: User;
  };
};
