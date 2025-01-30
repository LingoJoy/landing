import { ETranslate } from "@/constants";
import { Lesson } from "./lessons";

export type DailyCourse = {
  _id: string;
  title: {
    [key in ETranslate]: string;
  };
  desc: {
    [key in ETranslate]: string;
  };
  category: string;
  cellType: number;
  isPopularity: boolean;
  lesson: Lesson;
  priority: number;
  type: string;
};
