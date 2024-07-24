export interface ISelectorData {
    id: number;
    icon: string;
    title: string;
}

export interface ISelectorBubblesData {
    id: number;
    title: string;
    scale: number;
    top: string;
    left: string;
}

export interface ILevel {
    id: number;
    title: string;
    active: number;
    passive: number;
}

export interface IUser {
    id: number;
    image: string;
    name: string;
    country: string;
    level: number;
    comment: string;
    date: string;
}

export interface IPlan {
    id: number;
    title: string;
    icon: string;
    price: number;
    discount?: number;
    thenPrice?: number;
    period: string;
    periodPrice: number;
    weeks: number;
}

export * from './landing.data';
export * from './premium.data';
