import { SET_SELECTED_COORDINATES } from './types';

/* eslint-disable camelcase */
const geometry = {
  pickup_coordinates: [],
  drop_coordinates: [],
};

function selectedCoordinatesReducer(state = geometry, action) {
  switch (action.type) {
    case SET_SELECTED_COORDINATES:
      return action.payload;
    default:
      return state;
  }
}

export default selectedCoordinatesReducer;
