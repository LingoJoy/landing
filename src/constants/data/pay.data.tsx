import VerifyImage from "@/assets/icons/verify.svg";

import { ISelectorQuestNodeData } from ".";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";

export const DEFAULT_EMBARRASS_DATA: ISelectorQuestNodeData[] = [
  {
    id: 0,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_EMBARRASS_OPTION_1,
  },
  {
    id: 1,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_EMBARRASS_OPTION_2,
  },
  {
    id: 2,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_EMBARRASS_OPTION_3,
  },
];

export const DEFAULT_VERBS_DATA: ISelectorQuestNodeData[] = [
  {
    id: 0,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_VERBS_OPTION_1,
  },
  {
    id: 1,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_VERBS_OPTION_2,
  },
  {
    id: 2,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_VERBS_OPTION_3,
  },
  {
    id: 3,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_VERBS_OPTION_4,
  },
  {
    id: 4,
    icon: <VerifyImage />,
    title: ELocalizationQuestionnaire.QUEST_PAY_VERBS_OPTION_5,
  },
];
