import BookImage from "@/assets/statements/book.png";
import TVImage from "@/assets/main/iphone.png";
import SongImage from "@/assets/statements/game.png";
import CommunicateImage from "@/assets/statements/laptop.png";
import BusinessImage from "@/assets/statements/email.png";
import OtherImage from "@/assets/statements/coffee.png";

import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_STATEMENT_DATA: ISelectorQuestData[] = [
    {
        id: 1,
        icon: TVImage,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_1,
        value: "I follow social media content in English",
    },
    {
        id: 2,
        icon: SongImage,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_2,
        value: "I play video games and interact in English",
    },
    {
        id: 3,
        icon: CommunicateImage,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_3,
        value: "I attend online courses or webinars in English",
    },
    {
        id: 4,
        icon: BusinessImage,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_4,
        value: "I write emails or messages in English",
    },
    {
        id: 0,
        icon: BookImage,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_5,
        value: "I read books or e-books in English",
    },
    {
        id: 5,
        icon: OtherImage,
        title: ELocalizationQuestionnaire.QUEST_STATEMENTS_DATA_6,
        value: "I almost don’t hear or speak English in my daily life",
    },
];