import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'scss/styles.scss';
import 'react-toastify/dist/ReactToastify.css';

// Utils
import Router from 'router/Router';
import httpService from 'apis/httpService';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import SpinnerLoading from 'components/Common/SpinnerLoading/SpinnerLoading';

// import reportWebVitals from './reportWebVitals';

// Redux
import { Provider } from 'react-redux';
import store from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { popUpUtil } from 'components/Common/PopUpComponent/popUp/popUpUtil';
import { isRequestFullScreen, toggleFullScreen } from 'utils/requestFullScreen';

httpService.setupInterceptors(store);

let persistor = persistStore(store);

const reloadOnUpdate = (reg) => {
  const registrationWaiting = reg.waiting;

  if (registrationWaiting) {
    registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

    registrationWaiting.addEventListener('statechange', (e) => {
      if (e.target.state === 'activated') {
        window.location.reload();
      }
    });
  }
};

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<SpinnerLoading />}>
        <Router />
      </Suspense>
    </PersistGate>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onSuccess: () => popUpUtil('info', 'Page has been saved for offline use'),
  onUpdate: (reg) =>
    popUpUtil(
      'info',
      'There is a new version available.',
      'Update',
      () => reloadOnUpdate(reg),
      false
    ),
});

if (isRequestFullScreen()) {
  popUpUtil(
    'info',
    'Show app in fullscreen?',
    'Yes',
    () => toggleFullScreen(),
    false
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
