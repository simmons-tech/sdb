import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { ThemeProvider } from "styled-components";
import theme from "./theme.js";
import * as serviceWorker from './serviceWorker';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import { history } from './routing.js';
import withAuthentication from './hoc/withAuthentication';
import adminOnly from './hoc/adminOnly';
import * as ROUTES from './constants/routes';


// Pages
import HomePage from './pages/Home/HomePage';
import ProfilePage from './pages/Home/ProfilePage';
import LoginPage from './pages/Home/LoginPage';
import SignupPage from './pages/SignupPage';
import SignoutPage from './pages/SignoutPage';
import BulkUserPage from './pages/Admin/BulkUserPage';
import ImpersonatePage from './pages/Admin/ImpersonatePage';
import DirectoryPage from './pages/Directory/DirectoryPage';
import StudentOfficersPage from './pages/Directory/StudentOfficersPage';
import MedlinkPage from './pages/Directory/MedlinkPage';
import AssociateAdvisorPage from './pages/Directory/AssociateAdvisorPage';
import ResidentPeerMentorsPage from './pages/Directory/ResidentPeerMentorsPage';
import PleasureEducatorsPage from './pages/Directory/PleasureEducatorsPage';
import EditStudentGroupsPage from './pages/Admin/EditStudentGroupsPage';
import EditOfficersPage from './pages/Admin/EditOfficersPage';
import RoomHistoryPage from './pages/Admin/RoomHistoryPage';
import RoomStatusSummaryPage from './pages/Admin/RoomStatusSummaryPage';
import NoMatchPage from './pages/NoMatchPage';

import withSession from "./hoc/withSession"

const routing = (
  <Router history={history}>
    <div>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/"><Redirect to={ROUTES.HOME} /></Route>
          <Route exact path={ROUTES.HOME} component={withAuthentication(HomePage)} />
          <Route exact path={ROUTES.PROFILE} component={withAuthentication(ProfilePage)} />
          <Route exact path={ROUTES.LOGIN} component={withSession(LoginPage)} />
          <Route exact path={ROUTES.SIGN_UP} component={withAuthentication(SignupPage)} />
          <Route exact path={ROUTES.SIGN_OUT} component={SignoutPage} />
          <Route exact path={ROUTES.RESIDENT_DIRECTORY} component={withAuthentication(DirectoryPage)} />
          <Route exact path={ROUTES.OFFICERS} component={withAuthentication(StudentOfficersPage)} />
          <Route exact path={ROUTES.MEDLINKS} component={withAuthentication(MedlinkPage)} />
          <Route exact path={ROUTES.ADVISORS} component={withAuthentication(AssociateAdvisorPage)} />
          <Route exact path={ROUTES.MENTORS} component={withAuthentication(ResidentPeerMentorsPage)} />
          <Route exact path={ROUTES.PLEASURE} component={withAuthentication(PleasureEducatorsPage)} />
          <Route exact path={ROUTES.BULK_USER} component={adminOnly(BulkUserPage)} />
          <Route exact path={ROUTES.IMPERSONATE} component={adminOnly(ImpersonatePage)} />
          <Route exact path={ROUTES.EDIT_GROUPS} component={adminOnly(EditStudentGroupsPage)} />
          <Route exact path={ROUTES.EDIT_OFFICERS} component={adminOnly(EditOfficersPage)} />
          <Route exact path={ROUTES.ROOM_STATUS_SUMMARY} component={adminOnly(RoomStatusSummaryPage)} />
          <Route exact path={ROUTES.ROOM_HISTORY} component={adminOnly(RoomHistoryPage)} />
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
