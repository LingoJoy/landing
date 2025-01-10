
import { localizationQuestionnaireSliceReducer } from "./slice";

const localizationQuestionnaireReducer = {
  ...localizationQuestionnaireSliceReducer,
};

export * from "./slice";
export * from "./selectors";

export default localizationQuestionnaireReducer;
