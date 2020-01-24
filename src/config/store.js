import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import createLoadingPlugin from '@rematch/loading';
import * as models from '../models';
import instance from '../services/instance';

const persistPlugin = createRematchPersist({
  whitelist: ['auth', 'config', 'event'],
  keyPrefix: '--persist-key-',
  throttle: 500,
  version: 1,
});

const loadingPlugin = createLoadingPlugin({});

const store = init({
  models,
  plugins: [persistPlugin, loadingPlugin],
});

const state = store.getState();
const unsubscribe = store.subscribe(() => {
  const newAuth = store.getState().auth;
  if (state.auth !== newAuth) {
    instance.setToken(newAuth.token);
  }
});

export default store;
