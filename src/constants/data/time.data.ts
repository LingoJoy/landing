import OneImage from "@/assets/main/doc.png";
import TwoImage from "@/assets/main/docs.png";
import ThreeImage from "@/assets/main/notes.png";
import FourImage from "@/assets/main/folder.png";
import BusinessImage from "@/assets/statements/business.png";

import ParachuteImage from "@/assets/transport/parachute.png";
import HelicopterImage from "@/assets/transport/helicopter.png";
import PlaneImage from "@/assets/transport/plane.png";
import RocketImage from "@/assets/transport/rocket.png";

import SunImage from "@/assets/main/sun.png";
import FlyPlaneImage from "@/assets/transport/fly-plane.png";
import HamburgerImage from "@/assets/main/hamburger.png";
import AmourImage from "@/assets/main/amour.png";
import DNAImage from "@/assets/main/dna.png";
import BankImage from "@/assets/main/bank.png";
import YenImage from "@/assets/main/yen.png";
import LaptopImage from "@/assets/statements/laptop.png";

import GirlWalkImage from "@/assets/main/girl-walk.png";
import GirlRunImage from "@/assets/main/girl-run.png";
import BicycleImage from "@/assets/main/bicycle.png";
import HorseImage from "@/assets/main/horse.png";

import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_TIMER = 10000;

export const DEFAULT_HOW_OFTEN_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: OneImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_OFTEN_1,
        value: "1 time per week",
    },
    {
        id: 1,
        icon: TwoImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_OFTEN_2,
        value: "2 times per week",
    },
    {
        id: 2,
        icon: ThreeImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_OFTEN_3,
        value: "3 times per week",
    },
    {
        id: 3,
        icon: FourImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_OFTEN_4,
        value: "4 times per week",
    },
    {
        id: 4,
        icon: BusinessImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_OFTEN_5,
        value: "5 times per week",
    },

];

export const DEFAULT_HOW_MUCH_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: ParachuteImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_MUCH_1,
        value: "10 - 15 min",
    },
    {
        id: 1,
        icon: HelicopterImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_MUCH_2,
        value: "20 - 40 min",
    },
    {
        id: 2,
        icon: PlaneImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_MUCH_3,
        value: "1 hour",
    },
    {
        id: 3,
        icon: RocketImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_MUCH_4,
        value: "> 1 hour",
    },

];

export const DEFAULT_TOPICS_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: SunImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_1,
        value: "Daily Life",
    },
    {
        id: 1,
        icon: FlyPlaneImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_2,
        value: "Travel and Adventure",
    },
    {
        id: 2,
        icon: HamburgerImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_3,
        value: "Food & Cooking",
    },
    {
        id: 3,
        icon: AmourImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_4,
        value: "Relationships & Emotions",
    },
    {
        id: 4,
        icon: DNAImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_5,
        value: "Health & Wellness",
    },
    {
        id: 5,
        icon: BankImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_6,
        value: "Careers & Jobs",
    },
    {
        id: 6,
        icon: YenImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_7,
        value: "Business & Finance",
    },
    {
        id: 7,
        icon: LaptopImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_TOPICS_DATA_8,
        value: "Technology",
    },
];

export const DEFAULT_ACTIVITY_LEVEL_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: GirlWalkImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_ACTIVITIES_DATA_1,
        value: "I'm just getting started!",
    },
    {
        id: 1,
        icon: GirlRunImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_ACTIVITIES_DATA_2,
        value: "I practice a bit here and there",
    },
    {
        id: 2,
        icon: BicycleImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_ACTIVITIES_DATA_3,
        value: "I study a few times a week!",
    },
    {
        id: 3,
        icon: HorseImage,
        title: ELocalizationQuestionnaire.QUEST_TIME_ACTIVITIES_DATA_4,
        value: "I'm all in, studying every day!",
    },
];

export const DEFAULT_TIME_DATA = [
    "00:00",
    "00:15",
    "00:30",
    "00:45",
    "01:00",
    "01:15",
    "01:30",
    "01:45",
    "02:00",
    "02:15",
    "02:30",
    "02:45",
    "03:00",
    "03:15",
    "03:30",
    "03:45",
    "04:00",
    "04:15",
    "04:30",
    "04:45",
    "05:00",
    "05:15",
    "05:30",
    "05:45",
    "06:00",
    "06:15",
    "06:30",
    "06:45",
    "07:00",
    "07:15",
    "07:30",
    "07:45",
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
    "17:15",
    "17:30",
    "17:45",
    "18:00",
    "18:15",
    "18:30",
    "18:45",
    "19:00",
    "19:15",
    "19:30",
    "19:45",
    "20:00",
    "20:15",
    "20:30",
    "20:45",
    "21:00",
    "21:15",
    "21:30",
    "21:45",
    "22:00",
    "22:15",
    "22:30",
    "22:45",
    "23:00",
    "23:15",
    "23:30",
    "23:45",
];
