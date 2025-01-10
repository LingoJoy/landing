import { createSelector } from 'reselect';
import { RootState } from '@/store';

export const localizationState = (state: RootState) => state.localization;

export const getLocalization = createSelector(localizationState, data => {
  return data.localization;
});
