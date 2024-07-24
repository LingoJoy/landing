import {
  TApplicationActions,
  ESelectorActionTypes,
  TVocabularyAttributes,
} from "../types";

export const vocabularyReducer = (
  state: TVocabularyAttributes,
  action: TApplicationActions,
) => {
  switch (action.type) {
    case ESelectorActionTypes.SET_VOCABULARY_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

