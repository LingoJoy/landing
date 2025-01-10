import CareerImage from "@/assets/motivations/career.png";
import EducationImage from "@/assets/motivations/education.png";
import CultureImage from "@/assets/motivations/culture.png";
import BrainImage from "@/assets/motivations/brain.png";
import FamilyImage from "@/assets/motivations/family.png";
import TravelImage from "@/assets/motivations/travel.png";
import OtherImage from "@/assets/motivations/other.png";

import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_MOTIVATION_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: CareerImage,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_CAREER,
        value: "Business Success",
    },
    {
        id: 1,
        icon: EducationImage,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_EDUCATION,
        value: "Enjoy content in their original language",
    },
    {
        id: 2,
        icon: CultureImage,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_CULTURE,
        value: "Become a native speaker",
    },
    {
        id: 3,
        icon: BrainImage,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_BRAIN,
        value: "Mental Workout",
    },
    {
        id: 4,
        icon: FamilyImage,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_FAMILY,
        value: "Relationships & Friends",
    },
    {
        id: 5,
        icon: TravelImage,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_TRAVEL,
        value: "Travel",
    },
    {
        id: 6,
        icon: OtherImage,
        title: ELocalizationQuestionnaire.QUEST_MOTIVATION_OTHER,
        value: "Other",
    },
];