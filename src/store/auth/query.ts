import { TQuestionnaireType } from "@/types";
import { baseApi } from "../baseApi";
import { ETranslate, EUrls, ISelectorData, ISelectorQuestData } from "@/constants";

export interface ILanguage extends ISelectorData {
  translate: ETranslate;
}

export interface IQuestLanguage extends ISelectorQuestData {
  translate: ETranslate;
}

export interface User {
  subscriptionActive: boolean;
  email: string;
  role: string;
  level: string;
  name?: string;
  language?: ILanguage;
  locale: ETranslate;
  exercisesStatus: Record<string, unknown>;
  lessons: { [x: string]: { status: string, exercises?: { [key: string]: string }}};
  image?: string;
  additional_info: TQuestionnaireType;
  createdAt: string;
  dailyCourses: {
    lessonIds: string[];
  };
  __v: number;
  _id: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

const reducerPath = "AuthAPI";

export const AuthAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: EUrls.SIGN_IN,
        method: "POST",
        body: { email: email.toLowerCase().trim(), password },
      }),
    }),
  }),
});

export const AuthQueryReducer = { [reducerPath]: AuthAPI.reducer };

export const { useLoginMutation } = AuthAPI;
export const {
  endpoints: { login },
} = AuthAPI;
