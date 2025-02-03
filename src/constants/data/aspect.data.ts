import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "..";

export const DEFAULT_ASPECT_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}spelling.png`,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_1,
        value: "Vocabulary Building",
    },
    {
        id: 1,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}vocabulary.png`,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_2,
        value: "Speaking Confidence",
    },
    {
        id: 2,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}punctuation.png`,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_3,
        value: "Listening Skills",
    },
    {
        id: 3,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}tenses.png`,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_4,
        value: "Pronunciation",
    },
    {
        id: 4,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}phrasal-verbs.png`,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_5,
        value: "Everyday Conversation",
    },
];