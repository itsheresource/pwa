import { SESSION_STORAGE_TOKEN_KEY } from 'fixtures/sessionToken';
import { del } from 'idb-keyval';
import axios from 'axios';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { cleanUpRoute } from 'components/RouteFlow/_ducks/currentRoute/actions';
import { cleanUpSelectedItems } from 'components/RouteFlow/_ducks/selectedItems/actions';
import { cleanUpUserInfo } from 'components/Auth/_ducks/actions';
import { cleanUpSelectedRoute } from 'components/SelectedRoute/_ducks/actions';
import { logout } from 'apis/Auth/signOut';
import { push } from 'connected-react-router';
import { setSelectedCoordinates } from 'components/RouteFlow/_ducks/selectedCoordinates/actions';

const purgeReduxStates = (dispatch) => {
  dispatch(cleanUpRoute());
  dispatch(cleanUpSelectedItems());
  dispatch(cleanUpUserInfo());
  dispatch(cleanUpSelectedRoute());
};

export const signOut = async (dispatch) => {
  await logout();
  purgeReduxStates(dispatch);
  delete axios.defaults.headers.common['token'];
  dispatch(push(`${AVAILABLE_ROUTES.SIGNIN}`));
  del(SESSION_STORAGE_TOKEN_KEY);
  dispatch(
    setSelectedCoordinates({
      pickup_coordinates: [],
      drop_coordinates: [],
    })
  );
};
