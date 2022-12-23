import { SET_DETAILS_DATA } from './types';

const initialState = {};

function setRouteDetailsDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DETAILS_DATA:
      return action.payload;
    default:
      return state;
  }
}

export default setRouteDetailsDataReducer;
