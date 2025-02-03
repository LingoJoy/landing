import YesImage from "@/assets/animals/bird.png";
import NoImage from "@/assets/animals/egg.png";

import SmileImage from "@/assets/emoji/smile.png";
import BigSmileImage from "@/assets/emoji/big-smile.png";
import SmileWithHeartsImage from "@/assets/emoji/smile-with-hearts.png";
import BestSmileImage from "@/assets/emoji/best.png";

import OctopusImage from "@/assets/animals/octopus.png";
import FishImage from "@/assets/animals/fish.png";
import DolphinImage from "@/assets/animals/dolphin.png";
import SharkImage from "@/assets/animals/shark.png";
import WhaleImage from "@/assets/animals/whale.png";

import { ISelectorQuestData, ISelectorValueData } from ".";
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

export const DEFAULT_COUNT_CHILDREN_DATA: ISelectorValueData[] = [
    {
        id: 0,
        icon: SmileImage,
        value: "1",
    },
    {
        id: 1,
        icon: BigSmileImage,
        value: "2",
    },
    {
        id: 2,
        icon: SmileWithHeartsImage,
        value: "3",
    },
    {
        id: 3,
        icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}love.png`,
        value: "4",
    },
    {
        id: 4,
        icon: BestSmileImage,
        value: "5",
    },
];

export const DEFAULT_AGE_CHILDREN_DATA: ISelectorValueData[] = [
    {
        id: 0,
        icon: OctopusImage,
        value: "1 - 5 y.o.",
    },
    {
        id: 1,
        icon: FishImage,
        value: "6 - 11 y.o.",
    },
    {
        id: 2,
        icon: DolphinImage,
        value: "12 - 15 y.o.",
    },
    {
        id: 3,
        icon: SharkImage,
        value: "15 - 18 y.o.",
    },
    {
        id: 4,
        icon: WhaleImage,
        value: "18 +",
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