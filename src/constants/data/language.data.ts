import EnglishImage from "@/assets/flags/en.png";
import SpainImage from "@/assets/flags/es.png";
import PortugueseImage from "@/assets/flags/pt.png";
import FrenchImage from "@/assets/flags/fr.png";
import GermanImage from "@/assets/flags/de.png";
import RussianImage from "@/assets/flags/ru.png";
import IndonesianImage from "@/assets/flags/id.png";
import TurkishImage from "@/assets/flags/tr.png";
import ItalianImage from "@/assets/flags/it.png";
import UkrainianImage from "@/assets/flags/ua.png";
import PolishImage from "@/assets/flags/pl.png";
import DutchtImage from "@/assets/flags/nl.png";
import CzechImage from "@/assets/flags/cz.png";
import RomanianImage from "@/assets/flags/ro.png";
import GreekImage from "@/assets/flags/gr.png";
import HungarianImage from "@/assets/flags/hu.png";
import SwedishImage from "@/assets/flags/se.png";
import BulgarianImage from "@/assets/flags/bg.png";
import SerbianImage from "@/assets/flags/rs.png";
import FinnishImage from "@/assets/flags/fi.png";
import DanishImage from "@/assets/flags/dk.png";
import SlovakImage from "@/assets/flags/sk.png";
import CroatianImage from "@/assets/flags/hr.png";
import LithuanianImage from "@/assets/flags/lt.png";
import LatvianImage from "@/assets/flags/lv.png";
import EstonianImage from "@/assets/flags/ee.png";

import { ILanguage, IQuestLanguage } from "@/store/auth/query";
import { ELocalizationQuestionnaire } from "../localizationQuestionnaire";
import { ELocalization } from "../localization";

export enum ETranslate {
  AFRIKAANS = 'af',
  BULGARIAN = "bg",
  CATALAN = 'ca',
  CZECH = "cs",
  WELSH = 'cy',
  DANISH = "da",
  GERMAN = "de",
  GREEK = "el",
  ENGLISH = "en",
  SPANISH = "es",
  ESTONIAN = "et",
  FINNISH = "fi",
  FRENCH = "fr",
  HEBREW = 'he',
  CROATIAN = "hr",
  HUNGARIAN = "hu",
  INDONESIAN = "id",
  ITALIAN = "it",
  LITHUANIAN = "lt",
  LATVIAN = "lv",
  NORWEGIAN = 'nb',
  DUTCH = "nl",
  POLISH = "pl",
  PORTUGUESE = "pt",
  PORTUGUESE_BRAZILIAN = "pt_BR",
  ROMANIAN = "ro",
  RUSSIAN = "ru",
  SLOVAK = "sk",
  SLOVENIAN = "sl",
  SERBIAN = "sr",
  SWEDISH = "sv",
  THAI = 'th',
  TURKISH = "tr",
  UKRAINIAN = "uk",
  VIETNAMESE = 'vi',
  FILIPINO = 'tl',
}

export const DEFAULT_QUEST_LANGUAGE_DATA: IQuestLanguage[] = [
  {
    id: 0,
    icon: EnglishImage,
    title: ELocalizationQuestionnaire.LANGUAGE_EN,
    translate: ETranslate.ENGLISH,
  },
  {
    id: 1,
    icon: SpainImage,
    title: ELocalizationQuestionnaire.LANGUAGE_ES,
    translate: ETranslate.SPANISH,
  },
  {
    id: 2,
    icon: PortugueseImage,
    title: ELocalizationQuestionnaire.LANGUAGE_PT,
    translate: ETranslate.PORTUGUESE,
  },
  {
    id: 3,
    icon: FrenchImage,
    title: ELocalizationQuestionnaire.LANGUAGE_FR,
    translate: ETranslate.FRENCH,
  },
  {
    id: 4,
    icon: GermanImage,
    title: ELocalizationQuestionnaire.LANGUAGE_DE,
    translate: ETranslate.GERMAN,
  },
  {
    id: 5,
    icon: RussianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_RU,
    translate: ETranslate.RUSSIAN,
  },
  {
    id: 6,
    icon: IndonesianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_ID,
    translate: ETranslate.INDONESIAN,
  },
  {
    id: 7,
    icon: TurkishImage,
    title: ELocalizationQuestionnaire.LANGUAGE_TR,
    translate: ETranslate.TURKISH,
  },
  {
    id: 8,
    icon: ItalianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_IT,
    translate: ETranslate.ITALIAN,
  },
  {
    id: 9,
    icon: UkrainianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_UA,
    translate: ETranslate.UKRAINIAN,
  },
  {
    id: 10,
    icon: PolishImage,
    title: ELocalizationQuestionnaire.LANGUAGE_PL,
    translate: ETranslate.POLISH,
  },
  {
    id: 11,
    icon: DutchtImage,
    title: ELocalizationQuestionnaire.LANGUAGE_NL,
    translate: ETranslate.DUTCH,
  },
  {
    id: 12,
    icon: CzechImage,
    title: ELocalizationQuestionnaire.LANGUAGE_CS,
    translate: ETranslate.CZECH,
  },
  {
    id: 13,
    icon: RomanianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_RO,
    translate: ETranslate.ROMANIAN,
  },
  {
    id: 14,
    icon: GreekImage,
    title: ELocalizationQuestionnaire.LANGUAGE_EL,
    translate: ETranslate.GREEK,
  },
  {
    id: 15,
    icon: HungarianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_HU,
    translate: ETranslate.HUNGARIAN,
  },
  {
    id: 16,
    icon: SwedishImage,
    title: ELocalizationQuestionnaire.LANGUAGE_SV,
    translate: ETranslate.SWEDISH,
  },
  {
    id: 17,
    icon: BulgarianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_BG,
    translate: ETranslate.BULGARIAN,
  },
  {
    id: 18,
    icon: SerbianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_SR,
    translate: ETranslate.SERBIAN,
  },
  {
    id: 19,
    icon: FinnishImage,
    title: ELocalizationQuestionnaire.LANGUAGE_FI,
    translate: ETranslate.FINNISH,
  },
  {
    id: 20,
    icon: DanishImage,
    title: ELocalizationQuestionnaire.LANGUAGE_DA,
    translate: ETranslate.DANISH,
  },
  {
    id: 21,
    icon: SlovakImage,
    title: ELocalizationQuestionnaire.LANGUAGE_SK,
    translate: ETranslate.SLOVAK,
  },
  {
    id: 22,
    icon: CroatianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_HR,
    translate: ETranslate.CROATIAN,
  },
  {
    id: 23,
    icon: LithuanianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_LT,
    translate: ETranslate.LITHUANIAN,
  },
  {
    id: 24,
    icon: LatvianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_LV,
    translate: ETranslate.LATVIAN,
  },
  {
    id: 25,
    icon: EstonianImage,
    title: ELocalizationQuestionnaire.LANGUAGE_ET,
    translate: ETranslate.ESTONIAN,
  },
];

export const DEFAULT_LANGUAGE_DATA: ILanguage[] = [
  {
    id: 0,
    icon: EnglishImage,
    title: ELocalization.LANGUAGE_EN,
    translate: ETranslate.ENGLISH,
  },
  {
    id: 1,
    icon: SpainImage,
    title: ELocalization.LANGUAGE_ES,
    translate: ETranslate.SPANISH,
  },
  {
    id: 2,
    icon: PortugueseImage,
    title: ELocalization.LANGUAGE_PT,
    translate: ETranslate.PORTUGUESE,
  },
  {
    id: 3,
    icon: FrenchImage,
    title: ELocalization.LANGUAGE_FR,
    translate: ETranslate.FRENCH,
  },
  {
    id: 4,
    icon: GermanImage,
    title: ELocalization.LANGUAGE_DE,
    translate: ETranslate.GERMAN,
  },
  {
    id: 5,
    icon: RussianImage,
    title: ELocalization.LANGUAGE_RU,
    translate: ETranslate.RUSSIAN,
  },
  {
    id: 6,
    icon: IndonesianImage,
    title: ELocalization.LANGUAGE_ID,
    translate: ETranslate.INDONESIAN,
  },
  {
    id: 7,
    icon: TurkishImage,
    title: ELocalization.LANGUAGE_TR,
    translate: ETranslate.TURKISH,
  },
  {
    id: 8,
    icon: ItalianImage,
    title: ELocalization.LANGUAGE_IT,
    translate: ETranslate.ITALIAN,
  },
  {
    id: 9,
    icon: UkrainianImage,
    title: ELocalization.LANGUAGE_UA,
    translate: ETranslate.UKRAINIAN,
  },
  {
    id: 10,
    icon: PolishImage,
    title: ELocalization.LANGUAGE_PL,
    translate: ETranslate.POLISH,
  },
  {
    id: 11,
    icon: DutchtImage,
    title: ELocalization.LANGUAGE_NL,
    translate: ETranslate.DUTCH,
  },
  {
    id: 12,
    icon: CzechImage,
    title: ELocalization.LANGUAGE_CS,
    translate: ETranslate.CZECH,
  },
  {
    id: 13,
    icon: RomanianImage,
    title: ELocalization.LANGUAGE_RO,
    translate: ETranslate.ROMANIAN,
  },
  {
    id: 14,
    icon: GreekImage,
    title: ELocalization.LANGUAGE_EL,
    translate: ETranslate.GREEK,
  },
  {
    id: 15,
    icon: HungarianImage,
    title: ELocalization.LANGUAGE_HU,
    translate: ETranslate.HUNGARIAN,
  },
  {
    id: 16,
    icon: SwedishImage,
    title: ELocalization.LANGUAGE_SV,
    translate: ETranslate.SWEDISH,
  },
  {
    id: 17,
    icon: BulgarianImage,
    title: ELocalization.LANGUAGE_BG,
    translate: ETranslate.BULGARIAN,
  },
  {
    id: 18,
    icon: SerbianImage,
    title: ELocalization.LANGUAGE_SR,
    translate: ETranslate.SERBIAN,
  },
  {
    id: 19,
    icon: FinnishImage,
    title: ELocalization.LANGUAGE_FI,
    translate: ETranslate.FINNISH,
  },
  {
    id: 20,
    icon: DanishImage,
    title: ELocalization.LANGUAGE_DA,
    translate: ETranslate.DANISH,
  },
  {
    id: 21,
    icon: SlovakImage,
    title: ELocalization.LANGUAGE_SK,
    translate: ETranslate.SLOVAK,
  },
  {
    id: 22,
    icon: CroatianImage,
    title: ELocalization.LANGUAGE_HR,
    translate: ETranslate.CROATIAN,
  },
  {
    id: 23,
    icon: LithuanianImage,
    title: ELocalization.LANGUAGE_LT,
    translate: ETranslate.LITHUANIAN,
  },
  {
    id: 24,
    icon: LatvianImage,
    title: ELocalization.LANGUAGE_LV,
    translate: ETranslate.LATVIAN,
  },
  {
    id: 25,
    icon: EstonianImage,
    title: ELocalization.LANGUAGE_ET,
    translate: ETranslate.ESTONIAN,
  },
];

export const defaultQuestLanguage: IQuestLanguage = DEFAULT_QUEST_LANGUAGE_DATA[0];

export const defaultLanguage: ILanguage = DEFAULT_LANGUAGE_DATA[0];
