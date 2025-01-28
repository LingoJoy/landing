import BookIcon from "@/assets/new-premium/icons/book-heart.svg";
import BrainIcon from "@/assets/new-premium/icons/brain.svg";
import GamepadIcon from "@/assets/new-premium/icons/gamepad.svg";
import LuggageIcon from "@/assets/new-premium/icons/luggage.svg";
import MessageIcon from "@/assets/new-premium/icons/message-circle.svg";
import TimerIcon from "@/assets/new-premium/icons/timer.svg";

import ArtImage from "@/assets/new-premium/Art.png";
import DiaImage from "@/assets/new-premium/Dia.png";
import GabImage from "@/assets/new-premium/Gab.png";
import KleImage from "@/assets/new-premium/Kle.png";
import LucImage from "@/assets/new-premium/Luc.png";
import LuiImage from "@/assets/new-premium/Lui.png";
import ManImage from "@/assets/new-premium/Man.png";
import MaxImage from "@/assets/new-premium/Max.png";
import RuaImage from "@/assets/new-premium/Rua.png";
import SopImage from "@/assets/new-premium/Sop.png";

import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

import { IPlan } from "@/types";
import { ICommentData } from ".";

export const DEFAULT_PREMIUM_PLAN_DATA: IPlan[] = [
  {
    id: "0",
    title: "1-Week Trial",
    icon: "",
    price: "17.99",
    discount: "6.93",
    period: "per day",
    periodPrice: 2.54,
    periodDiscount: 0.99,
    weeks: 1,
    isFourWeek: true,
    priceId: "",
    productIds: [],
  },
  {
    id: "1",
    title: "4-Week Plan",
    icon: "",
    price: "38.95",
    discount: "15.19",
    period: "per day",
    periodPrice: 1.39,
    periodDiscount: 0.54,
    weeks: 4,
    isMostPopular: true,
    priceId: "",
    productIds: [],
  },
  {
    id: "2",
    title: "12-Week Plan",
    icon: "",
    price: "94.85",
    discount: "36.99",
    period: "per day",
    periodPrice: 1.13,
    periodDiscount: 0.44,
    weeks: 12,
    priceId: "",
    productIds: [],
  },
];

export const DEFAULT_PREMIUM_HIGHLIGHTS_DATA = [
  {
    id: 0,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_TITLE_1,
    icon: <TimerIcon />,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_DESCR_1,
  },
  {
    id: 1,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_TITLE_2,
    icon: <BookIcon />,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_DESCR_2,
  },
  {
    id: 2,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_TITLE_3,
    icon: <BrainIcon />,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_DESCR_3,
  },
  {
    id: 3,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_TITLE_4,
    icon: <GamepadIcon />,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_DESCR_4,
  },
  {
    id: 4,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_TITLE_5,
    icon: <MessageIcon />,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_DESCR_5,
  },
  {
    id: 5,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_TITLE_6,
    icon: <LuggageIcon />,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_HIGHLIGHTS_DATA_DESCR_6,
  },
];

export const DEFAULT_PREMIUM_USERS_DATA = [
  {
    id: 0,
    name: "Emily",
    comment:
      "I was nervous about starting, but this app made learning English so easy! I love the short lessons that fit into my busy day. Now, I feel confident speaking with my colleagues at work!",
  },
  {
    id: 1,
    name: "Liam",
    comment:
      "This app is perfect! I’ve learned over 500 new words in just a month. The exercises are fun and keep me motivated. It’s amazing how much progress I've made already!",
  },
  {
    id: 2,
    name: "Sophia",
    comment:
      "I’ve always struggled with pronunciation, but this app helped me so much. The AI tutor gives instant feedback, and now I can finally speak without feeling embarrassed. Highly recommend!",
  },
];

export const DEFAULT_PREMIUM_FAQ_DATA = [
  {
    id: 0,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_FAQ_DATA_TITLE_1,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_FAQ_DATA_DESCR_1,
  },
  {
    id: 1,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_FAQ_DATA_TITLE_2,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_FAQ_DATA_DESCR_2,
  },
  {
    id: 2,
    title: ELocalizationQuestionnaire.NEW_PREMIUM_FAQ_DATA_TITLE_3,
    description: ELocalizationQuestionnaire.NEW_PREMIUM_FAQ_DATA_DESCR_3,
  },
];

export const DEFAULT_PREMIUM_COMMENT_DATA: ICommentData[] = [
  {
    id: 0,
    image: DiaImage,
    name: "Dia****",
    country: "Dresden, Germany",
    liked: 45,
    imageLiked: RuaImage,
    nameLiked: "Rua****",
    comment:
      "Got the job I wanted! Learning 1,500 new words helped me nail my job interview in English. 🎉 Now, I can handle professional emails and conversations with ease! 💼🗣",
  },
  {
    id: 1,
    image: MaxImage,
    name: "Max****",
    country: "Belgrade, Serbia",
    liked: 7,
    imageLiked: KleImage,
    nameLiked: "Kle****",
    comment:
      "Dating just got easier! After learning English, 🌹 I can finally chat with that cute person I met while traveling. 🗣 No more awkward silences!",
  },
  {
    id: 2,
    image: LucImage,
    name: "Luc****",
    country: "Valencia, Spain",
    liked: 49,
    imageLiked: SopImage,
    nameLiked: "Sop****",
    comment:
      "Now I travel without worries! After learning 800 new phrases, I can easily chat with locals. 🌎 It feels amazing to explore new countries without a language barrier!",
  },
  {
    id: 3,
    image: LuiImage,
    name: "Lui****",
    country: "Braga, Portugal",
    liked: 87,
    imageLiked: ManImage,
    nameLiked: "Man****",
    comment:
      "I finally started speaking! Before, I could understand everything, but I struggled to speak fluently. 🗣 So proud of my progress! 💪✨",
  },
  {
    id: 4,
    image: GabImage,
    name: "Gab****",
    country: "Bruges, Belgium",
    liked: 45,
    imageLiked: ArtImage,
    nameLiked: "Art****",
    comment:
      "Finally understand movies without subtitles! 🍿 I learned over 2,000 words and improved my listening skills. Now, watching movies in English is fun and effortless! 🎬🙌",
  },
];
