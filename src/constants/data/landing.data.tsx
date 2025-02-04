import AppleImage from "@/assets/icons/apple.png";
import MedalImage from "@/assets/icons/medal.png";
import PaperImage from "@/assets/icons/paper.png";
import ScissorsImage from "@/assets/icons/scissors.png";

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
    passive: 30,
    code: "A1",
  },
  {
    id: 1,
    title: "Elementary",
    active: 31,
    passive: 70,
    code: "A2",
  },
  {
    id: 2,
    title: "Intermediate",
    active: 71,
    passive: 120,
    code: "B1",
  },
  {
    id: 3,
    title: "Upper-Intermediate",
    active: 121,
    passive: 172,
    code: "B2",
  },
  {
    id: 4,
    title: "Advanced",
    active: 173,
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
  `${import.meta.env.VITE_BACKEND_IMAGE_URL}iPhone-1.png`,
  `${import.meta.env.VITE_BACKEND_IMAGE_URL}iPhone-2.png`,
  `${import.meta.env.VITE_BACKEND_IMAGE_URL}iPhone-3.png`,
  `${import.meta.env.VITE_BACKEND_IMAGE_URL}iPhone-4.png`,
];

export const DEFAULT_GAMES_DATA = [
  {
    id: 0,
    title: "Medal",
    icon: <img src={MedalImage} alt=""/>,
  },
  {
    id: 1,
    title: "Bag",
    icon: "",
  },
  {
    id: 2,
    title: "Notepad",
    icon: <img src={PaperImage} alt=""/>,
  },
  {
    id: 3,
    title: "Apple",
    icon: <img src={AppleImage} alt=""/>,
  },
  {
    id: 4,
    title: "Scissors",
    icon: <img src={ScissorsImage} alt=""/>,
  },
];

export const DEFAULT_USERS_DATA: IUser[] = [
  {
    id: 0,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Raghunath.png`,
    name: "Raghunath Venkatesh",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}in.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 1,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Jenifer.png`,
    name: "Jennifer King",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}us.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 2,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Kai.png`,
    name: "Kai Virtanen",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}fi.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 3,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Lucas.png`,
    name: "Lucas Oliveira",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}br.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 4,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Mehmet.png`,
    name: "Mehmet Yılmaz",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}tr.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
];

export const DEFAULT_USERS_WEB_DATA: IUser[] = [
  {
    id: 0,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Raghunath.png`,
    name: "Raghunath Venkatesh",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}in.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 1,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Jenifer.png`,
    name: "Jennifer King",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}us.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 2,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Kai.png`,
    name: "Kai Virtanen",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}fi.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 3,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Patricia.png`,
    name: "Patricia Gomes Barbosa",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}br.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 4,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Mehmet.png`,
    name: "Mehmet Yılmaz",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}tr.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
  {
    id: 5,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Lucas.png`,
    name: "Lucas Oliveira",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}br.png`,
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
    icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}intelligent.png`,
    price: "19.99",
    period: "per day",
    periodPrice: 0.63,
    weeks: 4,
    priceId: "",
    productIds: []
  },
  {
    id: "1",
    title: "3 months",
    icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}smart.png`,
    price:" 57.99",
    discount: "39.99",
    period: "per day",
    periodPrice: 0.43,
    weeks: 13,
    priceId: "",
    productIds: []
  },
  {
    id: "2",
    title: "12 Months",
    icon: `${import.meta.env.VITE_BACKEND_IMAGE_URL}cool.png`,
    price: "228",
    discount: "99.99",
    period: "per day",
    periodPrice: 0.27,
    weeks: 52,
    priceId: "",
    productIds: []
  },
];
