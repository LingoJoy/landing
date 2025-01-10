import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { baseApi } from "./baseApi";
import lessonsReducer from "./lessons";
import exercisesReducer from "./ActiveLesson";
import profileReducer from "./profile";
import planReducer from "./plan";
import questionnaire from "./questionnaire";
import authReducer from "./auth";
import localizationReducer from "./localization";
import localizationQuestionnaireReducer from "./localization-questionnaire";
import bookReducer from "./book";

const combinedReducer = combineReducers({
  ...exercisesReducer,
  ...lessonsReducer,
  ...profileReducer,
  ...planReducer,
  ...questionnaire,
  ...authReducer,
  ...localizationReducer,
  ...localizationQuestionnaireReducer,
  ...bookReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
