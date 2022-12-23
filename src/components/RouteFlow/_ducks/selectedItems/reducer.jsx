import { SET_SELECTED_ITEMS, SET_ITEMS_LOADING, SIGN_OUT } from './types';

/* eslint-disable camelcase */
const initialState = [];

function selectedItemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_ITEMS:
      return [...action.payload];
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}

export default selectedItemsReducer;
