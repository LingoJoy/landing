import BoyWalkImage from "@/assets/main/boy-walk.png";
import GirlRunImage from "@/assets/main/girl-run.png";
import BoyRunImage from "@/assets/main/boy-run.png";

import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_ANALYZE_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_ANALYZING,
        value: "Analyzing your prefences",
        icon: '',
    },
    {
        id: 1,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_SELECTING,
        value: "Selecting topics for you",
        icon: '',
    },
    {
        id: 2,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_CUSTOMIZING,
        value: "Customizing the program for your age",
        icon: '',
    },
    {
        id: 3,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_OPTIMIZING,
        value: "Optimizing the learning activities",
        icon: '',
    },
    {
        id: 4,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_ESTIMATING,
        value: "Estimating the amount of assignments needed",
        icon: '',
    },
    {
        id: 5,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_PLANNING,
        value: "Planning your work schedule",
        icon: '',
    },
];

export const DEFAULT_PREPARED_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_FRESHMAN,
        value: "Freshman",
        icon: BoyWalkImage,
    },
    {
        id: 1,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_STUDENT,
        value: "Average Student",
        icon: GirlRunImage,
    },
    {
        id: 2,
        title: ELocalizationQuestionnaire.QUEST_ANALYZE_GURU,
        value: "Cramming Guru",
        icon: BoyRunImage,
    },
];