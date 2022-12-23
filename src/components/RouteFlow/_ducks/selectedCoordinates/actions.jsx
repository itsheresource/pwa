import { SET_SELECTED_COORDINATES } from './types';

export const setSelectedCoordinates = (geometry) => ({
  type: SET_SELECTED_COORDINATES,
  payload: geometry,
});
