import { ADD_USER_INFO, SIGN_OUT } from './types';

const initialState = {};

function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_INFO:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}

export default userInfoReducer;
