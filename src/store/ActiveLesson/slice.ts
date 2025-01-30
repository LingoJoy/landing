import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Exercise } from "@/types";
import {
  ELocalization,
  VocabularyExerciseType,
} from "@/constants";

export interface ExerciseState {
  progress: number;
  currentExercise: Exercise | null;
  exercises: Exercise[];
  numOfMistakes: number;
  activeCourse: { courseId: string; courseType: string; title: string } | null;
  gameFinished: boolean;
  description: string;
  completedExercises: string[];
  wrongCompletedExercises: Exercise[];
  goodIndex: number;
  goodShow: boolean;
  lessonId: string;
  category: string;
  title: string;
  gameRepeat: boolean;
}

const initialState: ExerciseState = {
  currentExercise: null,
  exercises: [],
  progress: 0,
  numOfMistakes: 0,
  activeCourse: null,
  gameFinished: false,
  description: "",
  completedExercises: [""],
  wrongCompletedExercises: [],
  goodIndex: 0,
  goodShow: false,
  lessonId: "",
  category: ELocalization.MOST_POPULARITY,
  title: "",
  gameRepeat: false,
};

const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    finishGame(state) {
      state.gameFinished = true;
    },
    resetActiveCourse() {
      return initialState;
    },
    setExercises(state, action: PayloadAction<Exercise[]>) {
      state.exercises = action.payload;
    },
    updateExercise(state, action: PayloadAction<Exercise>) {
      const currentExerciseInd = state.exercises.findIndex(
        (exercise) => exercise._id === action.payload._id,
      );

      const newExercises = [...state.exercises];
      newExercises[currentExerciseInd] = action.payload;

      state.exercises = newExercises;
    },
    hideGood(state) {
      state.goodShow = false;
      state.goodIndex = state.goodIndex + 1;
    },
    setStartLesson(
      state,
      action: PayloadAction<{
        courseId: string;
        courseType: string;
        title: string;
        exercises: Exercise[];
        lessonId: string;
        gameFinished?: boolean;
        completedExercises?: string[]
        gameRepeat?: boolean;
      }>,
    ) {
      const lastCompletedId = action.payload.completedExercises?.length
      ? action.payload.completedExercises[action.payload.completedExercises.length - 1]
      : null;

      const currentExercise = lastCompletedId
      ? action.payload.exercises.find(exercise => exercise._id === lastCompletedId)
      : null;

      const currentIndex = currentExercise
          ? action.payload.exercises.findIndex(ex => ex._id === currentExercise._id)
          : -1;

      let nextExercise = null;

      if (currentIndex !== -1 && currentIndex + 1 < action.payload.exercises.length) {
        nextExercise = action.payload.exercises[currentIndex + 1];
      }

      state.gameRepeat = action.payload.gameRepeat || false;
      state.activeCourse = action.payload;
      state.gameFinished = action.payload.gameFinished || false;
      state.completedExercises = action.payload.completedExercises || [];
      state.wrongCompletedExercises = [];
      if (nextExercise) {
        state.currentExercise = nextExercise;
      } else if (action.payload.gameRepeat) {
        state.currentExercise = { ...action.payload.exercises[0], completed: true };
      } else {
        state.currentExercise = action.payload.exercises[0];
      }
      state.exercises = action.payload.gameRepeat
        ? action.payload.exercises.map((el) => ({ ...el, completed: true }))
        : action.payload.exercises;
      state.lessonId = action.payload.lessonId;
      state.goodShow = false;
      state.title = action.payload.title;
    },
    setCurrentExercise(state, action: PayloadAction<string | undefined>) {
      const currentExercise = state.exercises.find(
        (exercise) => exercise._id === action.payload,
      );
      state.currentExercise = currentExercise || null;
    },
    setNextExercise(state, action: PayloadAction<string | undefined>) {
      const currentIndex = state.exercises.findIndex(
        (exercise) => exercise._id === state.currentExercise?._id,
      );
      const finishExercises = state.exercises.slice(0, currentIndex + 1);

      state.completedExercises = finishExercises.map((el) => el._id);

      if (
        state.exercises[currentIndex].type !==
        state.exercises[currentIndex + 1]?.type
      )
        state.goodShow = true;

      const finishGame = state.exercises.find(
        (exercise) => exercise.type === VocabularyExerciseType.FINAL,
      );

      if (!action.payload) state.gameFinished = true;

      const currentExercise = state.exercises.find(
        (exercise) => exercise._id === action.payload,
      );

      state.currentExercise = currentExercise || finishGame || null;
    },
    setFinishExercise(state) {
      if (state.wrongCompletedExercises.length > 0) state.goodShow = true;
      state.gameFinished = true;
      state.completedExercises = state.exercises.map((el) => el._id);
    },
    updateProgress(state, action: PayloadAction<string>) {
      const exerciseId = action.payload;

      if (!state.completedExercises.includes(exerciseId) && exerciseId) {
        state.completedExercises.push(exerciseId);
      }

      const progressPercentage =
        parseFloat(
          (
            (state.completedExercises.length / state.exercises.length) *
            100
          ).toFixed(0),
        ) || 0;

      state.progress = progressPercentage;
    },
    setWrongCompletedExersises(state, action: PayloadAction<string>) {
      const exercises = state.exercises;
      const wrongEx = exercises.find((item) => item._id === action.payload);
      const alreadyExists = state.wrongCompletedExercises.some(
        (item) => item._id === action.payload,
      );

      if (!alreadyExists && wrongEx) {
        state.wrongCompletedExercises.push(wrongEx);
      }
    },
    setStartFix(state, action: PayloadAction<string>) {
      state.exercises = state.wrongCompletedExercises;
      const currentExercise = state.exercises.find(
        (exercise) => exercise._id === action.payload,
      );

      state.currentExercise = currentExercise || null;
      state.gameFinished = false;
      state.completedExercises = [""];
      state.wrongCompletedExercises = [];
    },
  },
});

export const {
  setExercises,
  setStartLesson,
  resetActiveCourse,
  setNextExercise,
  updateProgress,
  setWrongCompletedExersises,
  hideGood,
  setCurrentExercise,
  updateExercise,
  setFinishExercise,
  setCategory,
  setStartFix,
} = exerciseSlice.actions;
export const exerciseSliceReducer = exerciseSlice.reducer;
