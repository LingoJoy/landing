
import { localizationSliceReducer } from "./slice";

const localizationReducer = {
  ...localizationSliceReducer,
};

export * from "./slice";
export * from "./selectors";

export default localizationReducer;
