
import { questionnaireSliceReducer } from "./slice";

const questionnaireReducer = {
  ...questionnaireSliceReducer,
};

export * from "./slice";
export * from "./selectors";

export default questionnaireReducer;
