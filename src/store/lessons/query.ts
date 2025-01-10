import { Lesson } from "@/types/lessons";
import { baseApi } from "../baseApi";

const reducerPath = "lessonsAPI";

export const lessonsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessons: builder.query<Array<Lesson>, unknown>({
      query: () => "lessons",
    }),
    getLessonById: builder.query<Lesson, string>({
      query: (id) => `lessons/show/${id}`,
    }),
    createLesson: builder.mutation<Lesson, Partial<Lesson>>({
      query: (newLesson) => ({
        url: "lessons/create",
        method: "POST",
        body: newLesson,
      }),
    }),
    editLesson: builder.mutation<Lesson, { id: string; data: Partial<Lesson> }>(
      {
        query: ({ id, data }) => ({
          url: `lessons/edit/${id}`,
          method: "POST",
          body: data,
        }),
      }
    ),
    deleteLesson: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `lessons/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetLessonsQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useEditLessonMutation,
  useDeleteLessonMutation,
} = lessonsAPI;

export const lessonsQueryReducer = { [reducerPath]: lessonsAPI.reducer };
