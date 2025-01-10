import { createSelector } from 'reselect';
import { RootState } from '@/store';

export const bookState = (state: RootState) => state.book;

export const getBook = createSelector(bookState, data => {
  return data.book;
});
