
import { bookSliceReducer } from "./slice";

const bookReducer = {
  ...bookSliceReducer,
};

export * from "./slice";
export * from "./selectors";

export default bookReducer;
