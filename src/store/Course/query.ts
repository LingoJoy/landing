import { Course, CoursesResponse } from "@/types/lessons";
import { baseApi } from "../baseApi";

const reducerPath = "CourseAPI";

export const CourseAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<Course, Partial<Course>>({
      query: (newCourse) => ({
        url: "course/create",
        method: "POST",
        body: newCourse,
      }),
    }),
    getCourseById: builder.query<Course, string>({
      query: (id) => `course/show/${id}`,
    }),
    getCourses: builder.query<CoursesResponse, void>({
      query: () => "course",
    }),
    deleteCourse: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `course/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCourseByIdQuery,
  useGetCoursesQuery,
  useDeleteCourseMutation,
} = CourseAPI;

export const CoursesQueryReducer = { [reducerPath]: CourseAPI.reducer };
