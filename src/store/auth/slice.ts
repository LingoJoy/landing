import { createSlice } from "@reduxjs/toolkit";
import { AuthAPI, User } from "./query";

export interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Exitlogout: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      AuthAPI.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      }
    );
  },
});

export const { Exitlogout } = authSlice.actions;

export const authSliceReducer = { auth: authSlice.reducer };
