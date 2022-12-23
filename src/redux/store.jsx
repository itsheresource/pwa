// Utils
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import rootReducer from './reducers';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = configureStore({
  reducer: persistedReducer, // root reducer with router state
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(routerMiddleware(history)), // for dispatching history actions
});

export default store;