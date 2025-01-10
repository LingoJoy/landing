import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import translationEN from "@/languages/en";

import { TLocalizationType } from "@/types";

export interface ILocalizationState {
  localization: TLocalizationType
}

const initialState: ILocalizationState = {
  localization: translationEN,
};

export const slice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    setLocalization: (
      state: ILocalizationState,
      action: PayloadAction<TLocalizationType>,
    ) => {
      state.localization = { ...state.localization, ...action.payload };
    },
  },
});

export const { setLocalization } = slice.actions;
export const localizationSliceReducer = { localization: slice.reducer };
