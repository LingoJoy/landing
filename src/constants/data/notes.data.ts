import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_NOTES_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}writer.png`,
        title: ELocalizationQuestionnaire.QUEST_YES,
        value: "Yes",
    },
    {
        id: 1,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}explosion.png`,
        title: ELocalizationQuestionnaire.QUEST_NO,
        value: "No",
    },
];
