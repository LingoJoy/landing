import { exerciseSliceReducer } from "./slice";

const exercisesReducer = {
  exercises: exerciseSliceReducer,
};

export * from "./slice";
export * from "./selectors";
export default exercisesReducer;
