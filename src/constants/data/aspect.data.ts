import SpellingImage from "@/assets/aspects/spelling.png";
import VocabularyImage from "@/assets/aspects/vocabulary.png";
import PunctuationImage from "@/assets/aspects/punctuation.png";
import TensesImage from "@/assets/aspects/tenses.png";
import PhrasalVerbsImage from "@/assets/aspects/phrasal-verbs.png";

import { ISelectorQuestData } from ".";
import { ELocalizationQuestionnaire } from "..";

export const DEFAULT_ASPECT_DATA: ISelectorQuestData[] = [
    {
        id: 0,
        icon: SpellingImage,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_1,
        value: "Vocabulary Building",
    },
    {
        id: 1,
        icon: VocabularyImage,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_2,
        value: "Speaking Confidence",
    },
    {
        id: 2,
        icon: PunctuationImage,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_3,
        value: "Listening Skills",
    },
    {
        id: 3,
        icon: TensesImage,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_4,
        value: "Pronunciation",
    },
    {
        id: 4,
        icon: PhrasalVerbsImage,
        title: ELocalizationQuestionnaire.QUEST_ASPECT_DATA_5,
        value: "Everyday Conversation",
    },
];