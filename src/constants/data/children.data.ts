import YesImage from "@/assets/animals/bird.png";
import NoImage from "@/assets/animals/egg.png";

import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_HAVE_CHILDREN_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: YesImage,
        title: ELocalizationQuestionnaire.QUEST_YES,
        value: "Yes",
    },
    {
        id: 1,
        icon: NoImage,
        title: ELocalizationQuestionnaire.QUEST_NO,
        value: "No",
    },
];

export const DEFAULT_WEEKENDS_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}plane.png`,
        title: ELocalizationQuestionnaire.QUEST_WEEKEND_DATA_1,
        value: "Traveling and exploring new places",
    },
    {
        id: 1,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}sofa.png`,
        title: ELocalizationQuestionnaire.QUEST_WEEKEND_DATA_2,
        value: "Relaxing at home with a book or movie ",
    },
    {
        id: 2,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}family.png`,
        title: ELocalizationQuestionnaire.QUEST_WEEKEND_DATA_3,
        value: "With family and friends",
    },
    {
        id: 3,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}shirt.png`,
        title: ELocalizationQuestionnaire.QUEST_WEEKEND_DATA_4,
        value: "Working on personal projects",
    },
];