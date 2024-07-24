import {
  TApplicationActions,
  ESelectorActionTypes,
} from "../types";

export const progressReducer = (
  state: number,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_PROGRESS_DATA:
      return action.payload;
    default:
      return state;
  }
};

