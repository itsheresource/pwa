import React, { useEffect, useState } from 'react';

// Utils
import { Route, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { SESSION_STORAGE_TOKEN_KEY } from 'fixtures/sessionToken';
import { get } from 'idb-keyval';
import PropTypes from 'prop-types';

// Redux
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [userInfo, setUserInfo] = useState(null);

  const dispatch = useDispatch();

  async function getToken() {
    const token = await get(SESSION_STORAGE_TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common.token = token;
      const theUserInfo = jwt.decode(token);
      setUserInfo(theUserInfo);
    } else {
      dispatch(push(AVAILABLE_ROUTES.WELCOME));
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  let isAuthenticated = false;

  if (userInfo) {
    const userInfoKeys = Object.keys(userInfo);
    isAuthenticated =
      userInfoKeys.includes('id') &&
      userInfoKeys.includes('name') &&
      userInfoKeys.includes('role');
  }

  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated && <Component {...props} />}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
