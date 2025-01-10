import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./../store/index";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth.token || localStorage.getItem("token");
      headers.set("Content-Type", "application/json;charset=UTF-8");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        headers.set("Authorization", "anonymous");
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
