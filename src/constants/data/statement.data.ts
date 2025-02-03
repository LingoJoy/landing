import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_STATEMENT_DATA: ISelectorQuestData[] = [
    {
        id: 1,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}iphone.png`,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_1,
        value: "I follow social media content in English",
    },
    {
        id: 2,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}game.png`,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_2,
        value: "I play video games and interact in English",
    },
    {
        id: 3,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}laptop.png`,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_3,
        value: "I attend online courses or webinars in English",
    },
    {
        id: 4,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}email.png`,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_4,
        value: "I write emails or messages in English",
    },
    {
        id: 0,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}book.png`,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_5,
        value: "I read books or e-books in English",
    },
    {
        id: 5,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}coffee.png`,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_6,
        value: "I almost don’t hear or speak English in my daily life",
    },
];