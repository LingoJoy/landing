import { ELocalization, ETranslate } from "@/constants";

export enum Levels {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export type Exercise = {
  _id: string;
  lesson: string;
  type: string;
  __t: string;
  text?:
  | string
  | {
    [key in ETranslate]: string;
  };
  missWord?: string;
  imageURL?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  word?: string;
  desc?: {
    [key in ETranslate]: string;
  };
  audioURL?: string;
  correctAnswerIndex?: number;
  chooses?: string[];
  putWordText?: string;
  correctText?: string;
  words: string[] | { word: string; audioURL: string }[];
  correctWords?: string[];
  couples?: {
    word: string;
    imageURL: string;
  }[];
  shuffledCouples?: {
    word: string;
    imageURL: string;
  }[];
  title?: {
    [key in ETranslate]: string;
  };
  title_theory?: {
    [key in ETranslate]: string;
  };
  name?: string;
  isTrue?: boolean;
  cards?: Exercise[];
  userOption?: string | string[];
  completed: boolean;
};

export type Lesson = {
  _id: string;
  title: {
    [key in ETranslate]: string;
  };
  course: { _id: string };
  level: Levels;
  imageURL: string;
  exercises: Array<Exercise>;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export enum CourseType {
  Vocabulary = "vocabulary",
  ListeningSpeaking = "speaking",
  Grammar = "grammar",
  Reading = "book",
  PopularPhrases = "Popular Phrases",
}

export enum CourseTitle {
  Vocabulary = ELocalization.COURSE_TYPE_VOCABULARY,
  ListeningSpeaking = ELocalization.COURSE_TYPE_SPEAKING,
  Grammar = ELocalization.COURSE_TYPE_GRAMMAR,
  Reading = ELocalization.COURSE_TYPE_BOOK,
  PopularPhrases = ELocalization.COURSE_TYPE_POPULAR_PHRASES,
}

export type Course = {
  _id: string;
  type: string;
  title: {
    [key in ETranslate]: string;
  };
  desc: {
    [key in ETranslate]: string;
  };
  imageURL: string;
  isEnabled: boolean;
  lessons: Array<Lesson>;
  lesson: Lesson;
  createdAt: string;
  updatedAt: string;
  name?: string;
  author?: string;
  category: string;
  __v: number;
};

export type CoursesResponse = Array<Course>;
