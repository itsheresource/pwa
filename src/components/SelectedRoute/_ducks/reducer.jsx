import { UPDATE_ROUTE, SIGN_OUT } from './types';

const initialState = {};

function selectedRouteReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ROUTE:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}

export default selectedRouteReducer;
