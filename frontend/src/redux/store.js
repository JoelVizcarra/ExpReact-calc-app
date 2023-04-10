import { configureStore } from '@reduxjs/toolkit';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

import { authApi } from './services/authApi';
import { appApi } from './services/appApi';
import userReducer from './features/userSlice';

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
  [appApi.reducerPath]: appApi.reducer,
  userState: userReducer,
};

const middlewares = [
  createStateSyncMiddleware({
    broadcastChannelOption: { type: 'localstorage' },
  }),
  authApi.middleware,
  appApi.middleware,
];

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

initMessageListener(store);
