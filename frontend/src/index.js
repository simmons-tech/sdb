import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import NoMatchPage from './NoMatchPage';
import * as serviceWorker from './serviceWorker';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './routing.js';
import withAuthentication from './hoc/withAuthentication';
import * as ROUTES from './constants/routes';


const routing = (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={withAuthentication(App)} />
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
