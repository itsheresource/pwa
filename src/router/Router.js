import React from 'react';

// Utils
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import { AVAILABLE_ROUTES } from 'fixtures/routesUrls';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { history } from 'redux/store';

import App from 'components/App/App';
import SignUp from 'components/Auth/SignUp/SignUp';
import SignIn from 'components/Auth/SignIn/SignIn';
import ForgetPassword from 'components/Auth/ForgetPassword/ForgetPassword';
import Welcome from 'components/Auth/Welcome/Welcome';
import ResendCode from 'components/Auth/ResendCode/ResendCode.jsx';
import VerifyCode from 'components/Auth/VerifyCode/VerifyCode.jsx';

const Router = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path={AVAILABLE_ROUTES.WELCOME} component={Welcome} />
        <Route path={AVAILABLE_ROUTES.SIGNIN} component={SignIn} />
        <Route path={AVAILABLE_ROUTES.SIGNUP} component={SignUp} />
        <Route path={AVAILABLE_ROUTES.RESEND_CODE} component={ResendCode} />
        <Route path={AVAILABLE_ROUTES.VERIFY_CODE} component={VerifyCode} />
        <Route
          path={AVAILABLE_ROUTES.FORGET_PASSWORD}
          component={ForgetPassword}
        />
        <PrivateRoute path={AVAILABLE_ROUTES.DASHBOARD} component={App} />
      </Switch>
    </ConnectedRouter>
  );
};

export default Router;
