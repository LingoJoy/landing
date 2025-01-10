
import { profileSliceReducer } from "./slice";

const profileReducer = {
  ...profileSliceReducer,
};

export * from "./slice";
export * from "./selectors";

export default profileReducer;
