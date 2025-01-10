import { lessonsQueryReducer } from "./query";
import { lessonsSliceReducer } from "./slice";

const lessonReducer = {
  ...lessonsQueryReducer,
  ...lessonsSliceReducer,
};

export * from "./query";
export * from "./slice";
export * from "./selectors";
export default lessonReducer;
