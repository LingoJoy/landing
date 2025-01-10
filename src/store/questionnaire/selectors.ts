import { createSelector } from 'reselect';
import { RootState } from '@/store';

export const questionnaireState = (state: RootState) => state.questionnaire;

export const getQuestionnaire = createSelector(questionnaireState, data => {
  return data.questionnaire;
});
