import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "@/types";

export interface IBookState {
  book: IBook | null;
}

export const initialState: IBookState = {
  book: null,
};

export const slice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook: (state: IBookState, action: PayloadAction<IBook | null>) => {
      state.book = action.payload;
    },
  },
});

export const { setBook } = slice.actions;
export const bookSliceReducer = { book: slice.reducer };
