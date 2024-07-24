import {
  TApplicationActions,
  ESelectorActionTypes,
  TChildrenAttributes,
} from "../types";

export const childrenReducer = (
  state: TChildrenAttributes,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_CHILDREN_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

