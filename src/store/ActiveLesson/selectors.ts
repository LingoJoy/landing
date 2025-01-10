import { createSelector } from "reselect";
import { RootState } from "@/store";

const exercisesState = (state: RootState) => state.exercises;

export const selectExercise = createSelector(
  exercisesState,
  (data) => data
);

export const selectCurrentExercise = createSelector(
  exercisesState,
  (data) => data.currentExercise
);

export const selectExercises = createSelector(
  exercisesState,
  (data) => data.exercises
);

export const selectExercisesByType = (type: string) =>
  createSelector(selectExercises, (exercises) =>
    exercises.filter((exercise) => exercise.type === type)
  );

export const getActiveCourse = createSelector(
  exercisesState,
  (data) => data.activeCourse
);

export const isGameFinished = createSelector(
  exercisesState,
  (data) => data.gameFinished
);

export const getProgress = createSelector(
  exercisesState,
  (data) => data.progress
);

export const getDescription = createSelector(
  exercisesState,
  (data) => data.description
);

export const getActiveCourseType = createSelector(
  exercisesState,
  (data) => data.activeCourse?.courseType
);

export const getNextExerciseId = createSelector(
  exercisesState,
  (data) => {
    const currentExercise = data.currentExercise;
    const exercises = data.exercises;

    const currentIndex = exercises.findIndex(exercise => exercise._id === currentExercise?._id);

    if (currentIndex >= 0 && currentIndex < exercises.length - 1) {
      return exercises[currentIndex + 1]?._id;
    }

    return '';
  }
);

export const getPrevExerciseId = createSelector(
  exercisesState,
  (data) => {
    const currentExercise = data.currentExercise;
    const exercises = data.exercises;

    const currentIndex = exercises.findIndex(exercise => exercise._id === currentExercise?._id);

    if (currentIndex >= 0 && currentIndex <= exercises.length - 1) {
      return exercises[currentIndex - 1]?._id;
    }

    return '';
  }
);

export const getPrevWrongExerciseId = createSelector(
  exercisesState,
  (data) => {
    const currentExercise = data.currentExercise;
    const exercises = data.wrongCompletedExercises;

    const currentIndex = exercises.findIndex(exercise => exercise._id === currentExercise?._id);

    if (currentIndex >= 0 && currentIndex < exercises.length - 1) {
      return exercises[currentIndex - 1]?._id;
    }

    return '';
  }
);

export const getNextWrongExerciseId = createSelector(
  exercisesState,
  (data) => {
    const currentExercise = data.currentExercise;
    const exercises = data.wrongCompletedExercises;

    const currentIndex = exercises.findIndex(exercise => exercise._id === currentExercise?._id);

    if (currentIndex >= 0 && currentIndex < exercises.length - 1) {
      return exercises[currentIndex + 1]._id;
    }

    return '';
  }
);

export const getWrongExersises = createSelector(
  exercisesState,
  (data) => data.wrongCompletedExercises
);
