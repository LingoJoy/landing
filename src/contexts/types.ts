export type TActionMap<M> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    };
};

export type InitialStateType = TApplicationType & {};

export interface IProviderProps {
    children: React.ReactNode;
}

export enum ESelectorActionTypes {
    SET_MOTIVATION_DATA = "setMotivationData",
    SET_VOCABULARY_DATA = "setVocabularyData",
    SET_PERSONALIZATION_DATA = "setPersonalizationData",
    SET_CHILDREN_DATA = "setChildrenData",
    SET_TIME_DATA = "setTimeData",
    SET_ANALYZE_DATA = "setAnalyzeData",
    SET_EMAIL_DATA = "setEmailData",
    SET_PROGRESS_DATA = "setProgressData",
}

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

export type TApplicationType = {
    motivation: TMotivationAttributes;
    vocabulary: TVocabularyAttributes;
    personal: TPersonalAttributes;
    children: TChildrenAttributes;
    time: TTimeAttributes;
    analyze: string;
    email: string;
    step: number;
};

export type TSelectorPayload = {
    [ESelectorActionTypes.SET_MOTIVATION_DATA]: TMotivationAttributes;
    [ESelectorActionTypes.SET_VOCABULARY_DATA]: TVocabularyAttributes;
    [ESelectorActionTypes.SET_PERSONALIZATION_DATA]: TPersonalAttributes;
    [ESelectorActionTypes.SET_CHILDREN_DATA]: TChildrenAttributes;
    [ESelectorActionTypes.SET_TIME_DATA]: TTimeAttributes;
    [ESelectorActionTypes.SET_ANALYZE_DATA]: string;
    [ESelectorActionTypes.SET_EMAIL_DATA]: string;
    [ESelectorActionTypes.SET_PROGRESS_DATA]: number;
};

export type TApplicationActions =
    TActionMap<TSelectorPayload>[keyof TActionMap<TSelectorPayload>];
