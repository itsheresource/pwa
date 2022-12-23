// Utils
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import userInfoReducer from 'components/Auth/_ducks/reducer';
import currentRouteReducer from 'components/RouteFlow/_ducks/currentRoute/reducer';
import selectedRouteReducer from 'components/SelectedRoute/_ducks/reducer';
import selectedItemsReducer from 'components/RouteFlow/_ducks/selectedItems/reducer';
import setRouteDetailsDataReducer from 'components/SelectedRoute/_ducks/RouteDetailsData/reducer';
import selectedCoordinatesReducer from 'components/RouteFlow/_ducks/selectedCoordinates/reducer';

const rootReducer = (history) =>
  combineReducers({
    userInfo: userInfoReducer,
    currentRoute: currentRouteReducer,
    selectedRoute: selectedRouteReducer,
    selectedItems: selectedItemsReducer,
    router: connectRouter(history),
    selectedRouteDetails: setRouteDetailsDataReducer,
    selectedCoordinates: selectedCoordinatesReducer,
  });

export default rootReducer;
