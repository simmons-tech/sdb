import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NoMatchPage from './pages/NoMatchPage';
import * as serviceWorker from './serviceWorker';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './routing.js';
import withAuthentication from './hoc/withAuthentication';
import * as ROUTES from './constants/routes';


const routing = (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={withAuthentication(TodoPage)} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignupPage} />
        <Route component={NoMatchPage} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
