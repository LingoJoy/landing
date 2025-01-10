import { createSelector } from 'reselect';
import { RootState } from '@/store';

export const localizationQuestionnaireState = (state: RootState) => state.localizationQuestionnaire;

export const getLocalizationQuestionnaire = createSelector(localizationQuestionnaireState, data => {
  return data.localizationQuestionnaire;
});
