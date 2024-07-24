import {
  TApplicationActions,
  ESelectorActionTypes,
  TPersonalAttributes,
} from "../types";

export const personalReducer = (
  state: TPersonalAttributes,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_PERSONALIZATION_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

