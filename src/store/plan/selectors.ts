import { createSelector } from 'reselect';
import { RootState } from '@/store';

export const planState = (state: RootState) => state.plan;

export const getPlan = createSelector(planState, data => {
  return data.plan;
});
