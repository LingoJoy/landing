import VerifyImage from "@/assets/icons/verify-yellow.svg";

import RaghunathImage from "@/assets/users/Raghunath.png";
import JeniferImage from "@/assets/users/Jenifer.png";
import MehmetImage from "@/assets/users/Mehmet.png";

import InImage from "@/assets/flags/in.png";
import UsImage from "@/assets/flags/us.png";
import TrImage from "@/assets/flags/tr.png";

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
    id: 3,
    image: MehmetImage,
    name: "Mehmet Yılmaz",
    country: TrImage,
    level: 5,
    comment:
      "If you are not a native speaker but you have to speak as one because you are living in other country, you definitely need this app!",
    date: "Jan 6, 2021",
  },
];
