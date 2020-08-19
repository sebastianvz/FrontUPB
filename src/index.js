import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { getPersistor } from '@rematch/persist';
import { createBrowserHistory } from "history";

import store from "./config/store";
import * as registerServiceWorker from './registerServiceWorker';

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "./layouts/Admin.js";
import ErrorPage from "views/Pages/ErrorPage.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory(),
  persistor = getPersistor();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router history={hist}>
        <AdminLayout />
      </Router>
    </PersistGate>
  </Provider>
);

const AppSuspense = () => (
  <Suspense fallback={<h1>Cargando...</h1>}>
    <App />
  </Suspense>
);

 
registerServiceWorker.register();