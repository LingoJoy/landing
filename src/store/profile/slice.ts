import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAPI, User } from "../auth/query";
import { defaultLanguage } from "@/constants";

export interface ILocation {
  country_code: string,
  zip: string,
}

export interface IProfileState {
  profile: User | null;
  location: ILocation | null,
}

export const initialState: IProfileState = {
  profile: null,
  location: null,
};

export const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (
      state: IProfileState,
      action: PayloadAction<User | null>
    ) => {
      state.profile = action.payload;
    },
    setLocation: (
      state: IProfileState,
      action: PayloadAction<ILocation>
    ) => {
      state.location = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthAPI.endpoints.login.matchFulfilled,
      (state, action) => {
        if (action.payload.user) {
          const userProfile: User = {
            ...action.payload.user,
            language: action.payload.user.language || defaultLanguage,
          };
          state.profile = userProfile;
        } else {
          state.profile = null;
        }
      }
    );
  },
});

export const { setProfile, setLocation } = slice.actions;
export const profileSliceReducer = { profile: slice.reducer };
