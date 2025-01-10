import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import translationEN from "@/languages/en-quest";

import { TLocalizationQuestionnaireType } from "@/types";

export interface ILocalizationState {
  localizationQuestionnaire: TLocalizationQuestionnaireType
}

const initialState: ILocalizationState = {
  localizationQuestionnaire: translationEN,
};

export const slice = createSlice({
  name: "localizationQuestionnaire",
  initialState,
  reducers: {
    setLocalizationQuestionnaire: (
      state: ILocalizationState,
      action: PayloadAction<TLocalizationQuestionnaireType>,
    ) => {
      state.localizationQuestionnaire = { ...state.localizationQuestionnaire, ...action.payload };
    },
  },
});

export const { setLocalizationQuestionnaire } = slice.actions;
export const localizationQuestionnaireSliceReducer = { localizationQuestionnaire: slice.reducer };
