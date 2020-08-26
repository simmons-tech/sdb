import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import * as ROUTES from './constants/routes';
import adminOnly from './hoc/adminOnly';
import withAuthentication from './hoc/withAuthentication';
import withSession from "./hoc/withSession";
import './index.css';
import BulkUserPage from './pages/Admin/BulkUserPage';
import EditOfficersPage from './pages/Admin/EditOfficersPage';
import EditStudentGroupsPage from './pages/Admin/EditStudentGroupsPage';
import ImpersonatePage from './pages/Admin/ImpersonatePage';
import RoomHistoryPage from './pages/Admin/RoomHistoryPage';
import RoomStatusSummaryPage from './pages/Admin/RoomStatusSummaryPage';
import TreasuryPage from './pages/Admin/Treasury/TreasuryPage';
import AssociateAdvisorPage from './pages/Directory/AssociateAdvisorPage';
import DirectoryPage from './pages/Directory/DirectoryPage';
import GraPage from './pages/Directory/GraPage';
import MedlinkPage from './pages/Directory/MedlinkPage';
import PleasureEducatorsPage from './pages/Directory/PleasureEducatorsPage';
import ResidentPeerMentorsPage from './pages/Directory/ResidentPeerMentorsPage';
import StudentOfficersPage from './pages/Directory/StudentOfficersPage';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Home/LoginPage';
import ProfilePage from './pages/Home/ProfilePage';
import AboutPage from './pages/Home/AboutPage';
import MailingListsPage from "./pages/Home/MailingListsPage";
import NoMatchPage from './pages/NoMatchPage';
import SignoutPage from './pages/SignoutPage';
import SignupPage from './pages/SignupPage';
import { history } from './routing.js';
import * as serviceWorker from './serviceWorker';
import theme from "./theme.js";





const routing = (
  <Router history={history}>
    <div>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/"><Redirect to={ROUTES.HOME} /></Route>
          <Route exact path={ROUTES.HOME} component={withAuthentication(HomePage)} />
          <Route exact path={ROUTES.MAILING_LISTS} component={withAuthentication(MailingListsPage)} />
          <Route exact path={ROUTES.PROFILE} component={withAuthentication(ProfilePage)} />
          <Route exact path={ROUTES.ABOUT} component={withSession(AboutPage)} />
          <Route exact path={ROUTES.LOGIN} component={withSession(LoginPage)} />
          <Route exact path={ROUTES.SIGN_UP} component={withAuthentication(SignupPage)} />
          <Route exact path={ROUTES.SIGN_OUT} component={SignoutPage} />
          <Route exact path={ROUTES.RESIDENT_DIRECTORY} component={withAuthentication(DirectoryPage)} />
          <Route exact path={ROUTES.OFFICERS} component={withAuthentication(StudentOfficersPage)} />
          <Route exact path={ROUTES.MEDLINKS} component={withAuthentication(MedlinkPage)} />
          <Route exact path={ROUTES.GRAS} component={withAuthentication(GraPage)} />
          <Route exact path={ROUTES.ADVISORS} component={withAuthentication(AssociateAdvisorPage)} />
          <Route exact path={ROUTES.MENTORS} component={withAuthentication(ResidentPeerMentorsPage)} />
          <Route exact path={ROUTES.PLEASURE} component={withAuthentication(PleasureEducatorsPage)} />
          <Route exact path={ROUTES.BULK_USER} component={adminOnly(BulkUserPage)} />
          <Route exact path={ROUTES.IMPERSONATE} component={adminOnly(ImpersonatePage)} />
          <Route exact path={ROUTES.EDIT_GROUPS} component={adminOnly(EditStudentGroupsPage)} />
          <Route exact path={ROUTES.EDIT_OFFICERS} component={adminOnly(EditOfficersPage)} />
          <Route exact path={ROUTES.ROOM_STATUS_SUMMARY} component={adminOnly(RoomStatusSummaryPage)} />
          <Route exact path={ROUTES.ROOM_HISTORY} component={adminOnly(RoomHistoryPage)} />
          <Route exact path={ROUTES.TREASURY_HOME} component={adminOnly(TreasuryPage)} />
          <Route exact path={ROUTES.TREASURY_ACCOUNT} component={adminOnly(TreasuryPage)} />
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
