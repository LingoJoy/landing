import VerifyImage from "@/assets/icons/verify-yellow.svg";

import { ISelectorQuestNodeData, IUser } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_ORDER_DATA: ISelectorQuestNodeData[] = [
  {
    id: 0,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.PREMIUM_ORDER_OPTION_1,
  },
  {
    id: 1,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.PREMIUM_ORDER_OPTION_2,
  },
  {
    id: 2,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.PREMIUM_ORDER_OPTION_3,
  },
  {
    id: 3,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.PREMIUM_ORDER_OPTION_4,
  },
  {
    id: 4,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.PREMIUM_ORDER_OPTION_5,
  },
];

export const DEFAULT_USERS_PREMIUM_DATA: IUser[] = [
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
    id: 3,
    image: `${import.meta.env.VITE_BACKEND_IMAGE_URL}Mehmet.png`,
    name: "Mehmet Yılmaz",
    country: `${import.meta.env.VITE_BACKEND_IMAGE_URL}tr.png`,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
];
