import {
  CREATE_ROUTE,
  UPDATE_ROUTE,
  UPDATE_ROUTE_STATUS,
  SIGN_OUT,
  UPDATE_VEHICLE_ID,
} from './types';

export const createCurrentRoute = (route) => ({
  type: CREATE_ROUTE,
  payload: route,
});

export const updateCurrentRoute = (updatedRoute) => ({
  type: UPDATE_ROUTE,
  payload: updatedRoute,
});

export const updateRouteStatus = (routeStatus) => ({
  type: UPDATE_ROUTE_STATUS,
  payload: routeStatus,
});

export const cleanUpRoute = () => ({
  type: SIGN_OUT,
});

export const updateVehicleId = (updatedVehicleId) => ({
  type: UPDATE_VEHICLE_ID,
  _id: updatedVehicleId,
});
