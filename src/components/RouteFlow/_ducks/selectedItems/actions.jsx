import { SET_SELECTED_ITEMS, SIGN_OUT } from './types';

export const setSelectedItems = (items) => ({
  type: SET_SELECTED_ITEMS,
  payload: items,
});

export const cleanUpSelectedItems = () => ({
  type: SIGN_OUT,
});
