/*!

=========================================================
* Material Dashboard PRO React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import ErrorPage from "views/Pages/ErrorPage.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/auth" component={AuthLayout} />
      <Route path="/admin" component={AdminLayout} />
      <Redirect from="/" to="/auth" />
      <Redirect from="/admin" to="/admin/permisos" />
      <Route path="*" component={ErrorPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
