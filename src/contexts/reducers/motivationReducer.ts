import {
  TApplicationActions,
  ESelectorActionTypes,
  TMotivationAttributes,
} from "../types";

export const motivationReducer = (
  state: TMotivationAttributes,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_MOTIVATION_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

