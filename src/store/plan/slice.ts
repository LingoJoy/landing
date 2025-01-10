import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IPlan } from "@/types";

export interface IPlanState {
  plan: IPlan | null;
}

export const initialState: IPlanState = {
  plan: null,
};

export const slice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state: IPlanState, action: PayloadAction<IPlan | null>) => {
      state.plan = action.payload;
    },
  },
});

export const { setPlan } = slice.actions;
export const planSliceReducer = { plan: slice.reducer };
