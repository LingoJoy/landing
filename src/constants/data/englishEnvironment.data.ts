import YesImage from "@/assets/statements/game.png";
import NoImage from "@/assets/main/reject.png";

import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_ENGLISH_ENVIRONMENT_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: YesImage,
        title: ELocalizationQuestionnaire.QUEST_YES,
        value: "Yes",
    },
    {
        id: 1,
        icon: NoImage,
        title: ELocalizationQuestionnaire.QUEST_NO,
        value: "No",
    },
];