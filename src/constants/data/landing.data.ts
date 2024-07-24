import FirstImage from "../../images/screens/iPhone-1.png";
import SecondImage from "../../images/screens/iPhone-2.png";
import ThirdImage from "../../images/screens/iPhone-3.png";
import FourthImage from "../../images/screens/iPhone-4.png";

import PaperImage from "../../images/icons/paper.svg";
import AppleImage from "../../images/icons/apple.svg";
import ScissorsImage from "../../images/icons/scissors.svg";
import MedalImage from "../../images/icons/medal.svg";

import RaghunathImage from "../../images/users/Raghunath.png";
import JeniferImage from "../../images/users/Jenifer.png";
import KaiImage from "../../images/users/Kai.png";
import MehmetImage from "../../images/users/Mehmet.png";
import LucasImage from "../../images/users/Lucas.png";

import InImage from "../../images/flags/in.png";
import UsImage from "../../images/flags/us.png";
import FiImage from "../../images/flags/fi.png";
import BrImage from "../../images/flags/br.png";
import TrImage from "../../images/flags/tr.png";

import IntelligentImage from "../../images/emoji/intelligent.png";
import CoolImage from "../../images/emoji/cool.png";
import SmartImage from "../../images/emoji/smart.png";

import { ILevel, IPlan, ISelectorData, IUser } from ".";

export const DEFAULT_LEVEL_DATA: ILevel[] = [
    {
        id: 0,
        title: "Beginner (A1)",
        active: 300,
        passive: 600,
    },
    {
        id: 1,
        title: "Elementary (A2)",
        active: 600,
        passive: 1200,
    },
    {
        id: 2,
        title: "Intermediate (B1)",
        active: 1200,
        passive: 2500,
    },
    {
        id: 3,
        title: "Upper-Intermediate (B2)",
        active: 2500,
        passive: 5000,
    },
    {
        id: 4,
        title: "Advanced (C1)",
        active: 5000,
        passive: 10000,
    },
    {
        id: 5,
        title: "Proficiency (C2)",
        active: 10000,
        passive: 20000,
    },
];

export const DEFAULT_PLAN_DATA: ISelectorData[] = [
    {
        id: 0,
        title: "Follow a step-by-step personalized plan",
        icon: '',
    },
    {
        id: 1,
        title: "Learn English with fun, no more boring lessons",
        icon: '',
    },
    {
        id: 2,
        title: "Improve your English and use it in your life!",
        icon: '',
    },
];

export const DEFAULT_LESSON_DATA = [
    FirstImage, SecondImage, ThirdImage, FourthImage
]

export const DEFAULT_GAMES_DATA: ISelectorData[] = [
    {
        id: 0,
        title: "Medal",
        icon: MedalImage,
    },
    {
        id: 1,
        title: "Bag",
        icon: '',
    },
    {
        id: 2,
        title: "Notepad",
        icon: PaperImage,
    },
    {
        id: 3,
        title: "Apple",
        icon: AppleImage,
    },
    {
        id: 4,
        title: "Scissors",
        icon: ScissorsImage,
    },
];

export const DEFAULT_USERS_DATA: IUser[] = [
    {
        id: 0,
        image: RaghunathImage,
        name: "Raghunath Venkatesh",
        country: InImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
    {
        id: 1,
        image: JeniferImage,
        name: "Jennifer King",
        country: UsImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
    {
        id: 2,
        image: KaiImage,
        name: "Kai Virtanen",
        country: FiImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
    {
        id: 3,
        image: LucasImage,
        name: "Lucas Oliveira",
        country: BrImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
    {
        id: 4,
        image: MehmetImage,
        name: "Mehmet Yılmaz",
        country: TrImage,
        level: 5,
        comment: "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
        date: "Jan 6, 2021"
    },
];

export const DEFAULT_YOUR_PLAN_DATA: IPlan[] = [
    {
        id: 0,
        title: "1 month",
        icon: IntelligentImage,
        price: 19.99,
        // thenPrice: 29.99,
        period: "per day",
        periodPrice: 0.63,
        weeks: 4,
    },
    {
        id: 1,
        title: "3 months",
        icon: SmartImage,
        price: 57.99,
        discount: 39.99,
        period: "per day",
        periodPrice: 0.43,
        weeks: 13,
    },
    {
        id: 2,
        title: "12 Months",
        icon: CoolImage,
        price: 228,
        discount: 99.99,
        period: "per day",
        periodPrice: 0.27,
        weeks: 52,
    },
];
