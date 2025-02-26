import { ReactNode } from 'react';
import { ELocalization } from '../localization';
import { ELocalizationQuestionnaire } from '../localizationQuestionnaire';

export interface ISelectorData {
    id: number;
    icon: string;
    title: ELocalization;
    value?: string;
}

export interface ISelectorQuestData {
    id: number;
    icon: string;
    title: ELocalizationQuestionnaire;
    value?: string;
}

export interface ISelectorLandingData {
    id: number;
    icon: string;
    title: ELocalizationQuestionnaire;
    value?: string;
}

export interface ISelectorValueData {
    id: number;
    icon: string;
    value: string;
}

export interface ISelectorNodeData {
    id: number;
    icon: ReactNode;
    title: ELocalization;
}

export interface ISelectorQuestNodeData {
    id: number;
    icon: ReactNode;
    title: ELocalizationQuestionnaire;
    value?: string;
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
    code: string;
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

export interface ICommentData {
    id: number;
    image: string;
    name: string;
    country: string;
    liked: number;
    imageLiked: string;
    nameLiked: string;
    comment: string;
}

export interface IPreloadImagesData {
    id: number;
    icon: string;
}

export * from './age.data';
export * from './analyze.data';
export * from './aspect.data';
export * from './children.data';
export * from './englishEnvironment.data';
export * from './landing.data';
export * from './language.data';
export * from './motivation.data';
export * from './newLanding.data';
export * from './newPremium.data';
export * from './notes.data';
export * from './paddle.data';
export * from './pay.data';
export * from './premium.data';
export * from './profile.data';
export * from './statement.data';
export * from './time.data';
export * from './vocabulary.data';
