import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TQuestionnaireType } from "@/types";

export interface IQuestionnaireState {
  questionnaire: TQuestionnaireType;
}

const initialState: IQuestionnaireState = {
  questionnaire: {
    motivation: {
      language: "",
      motivation: [],
      aspects: [],
      notes: null,
      englishEnvironment: null,
      statements: [],
    },
    vocabulary: {
      a: [],
      b1: [],
      b2: [],
    },
    personal: {
      name: "",
      age: "",
    },
    children: {
      have: null,
      count: "",
      childrenAge: [],
      weekend: '',
    },
    time: {
      time: {
        from: "09:00",
        to: "21:00",
      },
      often: "",
      howMuch: "",
      topics: [],
      activityLevel: "",
    },
    analyze: "",
    email: "",
    step: 1,
  },
};

export const slice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setQuestionnaire: (
      state: IQuestionnaireState,
      action: PayloadAction<TQuestionnaireType>,
    ) => {
      state.questionnaire = action.payload;
    },
  },
});

export const { setQuestionnaire } = slice.actions;
export const questionnaireSliceReducer = { questionnaire: slice.reducer };
