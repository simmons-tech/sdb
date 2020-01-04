import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { ThemeProvider } from "styled-components";
import theme from "./theme.js";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SignoutPage from './pages/SignoutPage';
import BulkUserPage from './pages/BulkUserPage';
import ImpersonatePage from './pages/ImpersonatePage';
import NoMatchPage from './pages/NoMatchPage';
import * as serviceWorker from './serviceWorker';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './routing.js';
import withAuthentication from './hoc/withAuthentication';
import * as ROUTES from './constants/routes';


const routing = (
  <Router history={history}>
    <div>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path={ROUTES.HOME} component={withAuthentication(HomePage)} />
          <Route exact path={ROUTES.PROFILE} component={withAuthentication(ProfilePage)} />
          <Route exact path={ROUTES.LOGIN} component={LoginPage} />
          <Route exact path={ROUTES.SIGN_UP} component={withAuthentication(SignupPage)} />
          <Route exact path={ROUTES.SIGN_OUT} component={SignoutPage} />
          <Route exact path={ROUTES.BULK_USER} component={withAuthentication(BulkUserPage)} />
          <Route exact path={ROUTES.IMPERSONATE} component={withAuthentication(ImpersonatePage)} />
          <Route component={NoMatchPage}/>
        </Switch>
      </ThemeProvider>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
