import { createSelector } from "reselect";
import { RootState } from "@/store";

export const authState = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(authState, (auth) => auth.user);

export const selectAuthToken = createSelector(authState, (auth) => auth.token);
