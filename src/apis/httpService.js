// Utils
import axios from 'axios';
import { SESSION_STORAGE_TOKEN_KEY } from 'fixtures/sessionToken';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { del, get } from 'idb-keyval';
import { push } from 'connected-react-router';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';

// If backend implements an expiry time, decoding the token should return an `expiry` prop.
// You can refactor to check if the token is expired or not, then send the user to signin or dashboard accordingly

export default {
  setupInterceptors: (store) => {
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    axios.interceptors.request.use(
      async function (config) {
        const token = await get(SESSION_STORAGE_TOKEN_KEY);

        if (typeof token !== 'undefined') {
          config.headers.common['token'] = token;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          let message = 'Token is not valid';
          del(SESSION_STORAGE_TOKEN_KEY);
          switch (error.response && error.response.data.code) {
            case 0:
              message = 'Could not query auth server';
              break;
            case 10:
              message = 'You are not an admin';
              break;
            case 100:
              message = 'Token is not provided';
              break;
            case 101:
              message = 'Token is not valid for decoding';
              break;
            case 200:
              message = 'Token is not having valid auth data';
              break;
            case 201:
              message = 'Token is not active for the user account';
              break;
            case 202:
              message = 'Token has expired';
              break;
            case 203:
              message = 'This account is suspended';
              break;
            default:
              break;
          }

          console.warn(message);
          popUpUtil('warning', message);
          setTimeout(() => {
            store.dispatch(push(AVAILABLE_ROUTES.SIGNIN));
          }, 2000);
        } else if (error.response && error.response.status === 500) {
          popUpUtil('error', 'Server Issue');
        } else return error;
      }
    );
  },
};
