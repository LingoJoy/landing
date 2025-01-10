import { ELocalization } from "@/constants";
import { ELocalizationQuestionnaire } from "@/constants/localizationQuestionnaire";

export type TMotivationAttributes = {
    language: string;
    motivation: string[];
    aspects: string[];
    notes: null | boolean;
    englishEnvironment: null | boolean;
    statements: string[];
};

export type TPersonalAttributes = {
    name: string;
    age: string;
};

export type TChildrenAttributes = {
    have: null | boolean;
    count: string,
    weekend: string,
    childrenAge: string[];
};

export type TTime = {
    from: string;
    to: string;
}

export type TTimeAttributes = {
    time: TTime;
    often: string,
    howMuch: string;
    topics: string[];
    activityLevel: string;
};

export type TVocabularyAttributes = {
    a: string[];
    b1: string[];
    b2: string[];
};

export type TQuestionnaireType = {
    motivation: TMotivationAttributes;
    vocabulary: TVocabularyAttributes;
    personal: TPersonalAttributes;
    children: TChildrenAttributes;
    time: TTimeAttributes;
    analyze: string;
    email: string;
    step: number;
};


export type TLocalizationType = Record<ELocalization, string>

export type TLocalizationQuestionnaireType = Record<ELocalizationQuestionnaire, string>
