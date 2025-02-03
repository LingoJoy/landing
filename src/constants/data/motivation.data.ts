import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_MOTIVATION_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}career.png`,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_CAREER,
        value: "Business Success",
    },
    {
        id: 1,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}education.png`,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_EDUCATION,
        value: "Enjoy content in their original language",
    },
    {
        id: 2,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}culture.png`,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_CULTURE,
        value: "Become a native speaker",
    },
    {
        id: 3,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}brain.png`,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_BRAIN,
        value: "Mental Workout",
    },
    {
        id: 4,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}family.png`,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_FAMILY,
        value: "Relationships & Friends",
    },
    {
        id: 5,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}travel.png`,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_TRAVEL,
        value: "Travel",
    },
    {
        id: 6,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}other.png`,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_OTHER,
        value: "Other",
    },
];