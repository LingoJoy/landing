import {
  TApplicationActions,
  ESelectorActionTypes,
} from "../types";

export const analyzeReducer = (
  state: string,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_ANALYZE_DATA:
      return action.payload;
    default:
      return state;
  }
};

