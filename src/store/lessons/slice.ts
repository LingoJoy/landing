import { Lesson } from '@/types/lessons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
}

export const initialState: ILessonsState = {
  lessons: [],
  currentLesson: null,
};

export const slice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setLessons: (state: ILessonsState, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
    },
    setCurrentLesson(state, action) {
      const currentLesson = state.lessons.find(item => item._id === action.payload);
      if (currentLesson) {
        state.currentLesson = currentLesson;
      }
    },
  },
});

export const {
  setLessons,
} = slice.actions;
export const lessonsSliceReducer = { lessons: slice.reducer };
