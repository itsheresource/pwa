import { SIGN_OUT } from 'components/RouteFlow/_ducks/selectedItems/types';
import { UPDATE_ROUTE } from './types';

export const updateSelectedRoute = (changeRoute) => ({
  type: UPDATE_ROUTE,
  payload: changeRoute,
});

export const cleanUpSelectedRoute = () => ({
  type: SIGN_OUT,
});
