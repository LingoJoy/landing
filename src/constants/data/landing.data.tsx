import FirstImage from "@/assets/screens/iPhone-1.png";
import SecondImage from "@/assets/screens/iPhone-2.png";
import ThirdImage from "@/assets/screens/iPhone-3.png";
import FourthImage from "@/assets/screens/iPhone-4.png";

import AppleImage from "@/assets/icons/apple.svg";
import MedalImage from "@/assets/icons/medal.svg";
import PaperImage from "@/assets/icons/paper.svg";
import ScissorsImage from "@/assets/icons/scissors.svg";

import JeniferImage from "@/assets/users/Jenifer.png";
import KaiImage from "@/assets/users/Kai.png";
import LucasImage from "@/assets/users/Lucas.png";
import MehmetImage from "@/assets/users/Mehmet.png";
import PatriciaImage from "@/assets/users/Patricia.png";
import RaghunathImage from "@/assets/users/Raghunath.png";

import BrImage from "@/assets/flags/br.png";
import FiImage from "@/assets/flags/fi.png";
import InImage from "@/assets/flags/in.png";
import TrImage from "@/assets/flags/tr.png";
import UsImage from "@/assets/flags/us.png";

import CoolImage from "@/assets/emoji/cool.png";
import IntelligentImage from "@/assets/emoji/intelligent.png";
import SmartImage from "@/assets/emoji/smart.png";

import { ILevel, ISelectorQuestData, IUser } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

import { IPlan } from "@/types";

export const DEFAULT_LEVEL_DATA: ILevel[] = [
  {
    id: 0,
    title: "Beginner",
    active: 300,
    passive: 600,
    code: "A1",
  },
  {
    id: 1,
    title: "Elementary",
    active: 600,
    passive: 1200,
    code: "A2",
  },
  {
    id: 2,
    title: "Intermediate",
    active: 1200,
    passive: 2500,
    code: "B1",
  },
  {
    id: 3,
    title: "Upper-Intermediate",
    active: 2500,
    passive: 5000,
    code: "B2",
  },
  {
    id: 4,
    title: "Advanced",
    active: 5000,
    passive: 10000,
    code: "C1",
  },
  // {
  //   id: 5,
  //   title: "Proficiency (C2)",
  //   active: 10000,
  //   passive: 20000,
  //   code: "C2",
  // },
];

export const DEFAULT_LEVEL_POINT_DATA: ILevel[] = [
  {
    id: 0,
    title: "Beginner",
    active: 0,
    passive: 10,
    code: "A1",
  },
  {
    id: 1,
    title: "Elementary",
    active: 11,
    passive: 20,
    code: "A2",
  },
  {
    id: 2,
    title: "Intermediate",
    active: 21,
    passive: 40,
    code: "B1",
  },
  {
    id: 3,
    title: "Upper-Intermediate",
    active: 41,
    passive: 70,
    code: "B2",
  },
  {
    id: 4,
    title: "Advanced",
    active: 71,
    passive: 10000,
    code: "C1",
  },
];

export const DEFAULT_PLAN_DATA: ISelectorQuestData[] = [
  {
    id: 0,
    title: ELocalizationQuestionnaire.LANDING_PLAN_FOLLOW,
    value: "Follow a step-by-step personalized plan",
    icon: "",
  },
  {
    id: 1,
    title: ELocalizationQuestionnaire.LANDING_PLAN_LEARN,
    value: "Learn English with fun, no more boring lessons",
    icon: "",
  },
  {
    id: 2,
    title: ELocalizationQuestionnaire.LANDING_PLAN_IMPROVE,
    value: "Improve your English and use it in your life!",
    icon: "",
  },
];

export const DEFAULT_LESSON_DATA = [
  FirstImage,
  SecondImage,
  ThirdImage,
  FourthImage,
];

export const DEFAULT_GAMES_DATA = [
  {
    id: 0,
    title: "Medal",
    icon: <MedalImage />,
  },
  {
    id: 1,
    title: "Bag",
    icon: "",
  },
  {
    id: 2,
    title: "Notepad",
    icon: <PaperImage />,
  },
  {
    id: 3,
    title: "Apple",
    icon: <AppleImage />,
  },
  {
    id: 4,
    title: "Scissors",
    icon: <ScissorsImage />,
  },
];

export const DEFAULT_USERS_DATA: IUser[] = [
  {
    id: 0,
    image: RaghunathImage,
    name: "Raghunath Venkatesh",
    country: InImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 1,
    image: JeniferImage,
    name: "Jennifer King",
    country: UsImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 2,
    image: KaiImage,
    name: "Kai Virtanen",
    country: FiImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 3,
    image: LucasImage,
    name: "Lucas Oliveira",
    country: BrImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 4,
    image: MehmetImage,
    name: "Mehmet Yılmaz",
    country: TrImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
];

export const DEFAULT_USERS_WEB_DATA: IUser[] = [
  {
    id: 0,
    image: RaghunathImage,
    name: "Raghunath Venkatesh",
    country: InImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 1,
    image: JeniferImage,
    name: "Jennifer King",
    country: UsImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 2,
    image: KaiImage,
    name: "Kai Virtanen",
    country: FiImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 3,
    image: PatriciaImage,
    name: "Patricia Gomes Barbosa",
    country: BrImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 4,
    image: MehmetImage,
    name: "Mehmet Yılmaz",
    country: TrImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 5,
    image: LucasImage,
    name: "Lucas Oliveira",
    country: BrImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
];

export const DEFAULT_YOUR_PLAN_DATA: IPlan[] = [
  {
    id: "0",
    title: "1 month",
    icon: IntelligentImage,
    price: 19.99,
    period: "per day",
    periodPrice: 0.63,
    weeks: 4,
    priceId: "",
    productIds: []
  },
  {
    id: "1",
    title: "3 months",
    icon: SmartImage,
    price: 57.99,
    discount: 39.99,
    period: "per day",
    periodPrice: 0.43,
    weeks: 13,
    priceId: "",
    productIds: []
  },
  {
    id: "2",
    title: "12 Months",
    icon: CoolImage,
    price: 228,
    discount: 99.99,
    period: "per day",
    periodPrice: 0.27,
    weeks: 52,
    priceId: "",
    productIds: []
  },
];
