import {
  TApplicationActions,
  ESelectorActionTypes,
  TTimeAttributes,
} from "../types";

export const timeReducer = (
  state: TTimeAttributes,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_TIME_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

