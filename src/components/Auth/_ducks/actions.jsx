import { ADD_USER_INFO, SIGN_OUT } from './types';

export const addUserInfo = (userInfo) => ({
  type: ADD_USER_INFO,
  payload: userInfo,
});

export const cleanUpUserInfo = () => ({
  type: SIGN_OUT,
});
