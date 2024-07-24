import {
  TApplicationActions,
  ESelectorActionTypes,
} from "../types";

export const emailReducer = (
  state: string,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_EMAIL_DATA:
      return action.payload;
    default:
      return state;
  }
};

