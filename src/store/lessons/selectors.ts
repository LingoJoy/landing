import { createSelector } from "reselect";
import { RootState } from "@/store";
import { Levels } from "@/types/lessons";

export const lessonsState = (state: RootState) => state.lessons;

export const getLessons = createSelector(lessonsState, (data) => {
  return data.lessons;
});

export const getExercisesByLevel = createSelector(
  lessonsState,
  (_: unknown, level: Levels) => level,
  (data, level) => {
    return data.lessons.find((item) => item.level === level);
  }
);

export const getLessonsByCourseId = createSelector(
  [getLessons, (_: RootState, courseId: string) => courseId],
  (lessons, courseId) => lessons.filter((lesson) => lesson.course._id === courseId)
);

export const getCurrentLesson = createSelector(
  lessonsState,
  (data) => data.currentLesson
);
