
import { planSliceReducer } from "./slice";

const planReducer = {
  ...planSliceReducer,
};

export * from "./slice";
export * from "./selectors";

export default planReducer;
