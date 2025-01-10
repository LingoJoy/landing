import { createSelector } from 'reselect';
import { RootState } from '@/store';

export const profileState = (state: RootState) => state.profile;

export const getProfile = createSelector(profileState, data => {
  return data.profile;
});

export const getLocation = createSelector(profileState, data => {
  return data.location;
});
