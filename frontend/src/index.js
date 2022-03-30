import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import * as ROUTES from './constants/routes';
import adminOnly from './hoc/adminOnly';
import deskOnly from "./hoc/deskOnly";
import deskCaptainOnly from "./hoc/deskCaptainOnly";
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

// User Imports
import UserPackagePage from "./pages/Home/UserPackagePage";
import UserItemLoanPage from "./pages/Home/UserItemLoanPage";
import UserGuestListPage from './pages/Home/UserGuestListPage';


// Directory Imports
import AssociateAdvisorPage from './pages/Directory/AssociateAdvisorPage';
import DirectoryPage from './pages/Directory/DirectoryPage';
import GraPage from './pages/Directory/GraPage';
import MedlinkPage from './pages/Directory/MedlinkPage';
import PleasureEducatorsPage from './pages/Directory/PleasureEducatorsPage';
import ResidentPeerMentorsPage from './pages/Directory/ResidentPeerMentorsPage';
import StudentOfficersPage from './pages/Directory/StudentOfficersPage';

// Desk Imports
import DeskHome from './pages/Desk/DeskHome';
import AllPackages from './pages/Desk/AllPackages';
import SearchPackages from './pages/Desk/SearchPackages';
import DeskCheckout from './pages/Desk/DeskCheckout';
import DeskGuestList from './pages/Desk/GuestList';
import ItemReturn from './pages/Desk/ItemReturn';
import AddDeskItem from './pages/Desk/AddDeskItem';
import RegisterPackages from './pages/Desk/RegisterPackages';

// Home Page Imports
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Home/LoginPage';
import ProfilePage from './pages/Home/ProfilePage';
import AboutPage from './pages/Home/AboutPage';
import CheckoutList from './pages/Home/CheckoutList';
import LibraryPage from './pages/Home/LibraryPage';
import MiscPage from './pages/Home/MiscPage';
import EventsPage from './pages/Home/EventsPage';
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
          <Route exact path={ROUTES.GUEST_LIST} component={withAuthentication(UserGuestListPage)} />
          <Route exact path={ROUTES.ABOUT} component={withSession(AboutPage)} />
          <Route exact path={ROUTES.MOVIES} component={withSession(CheckoutList)} />
          <Route exact path={ROUTES.LIBRARY} component={withSession(LibraryPage)} />
          <Route exact path={ROUTES.MISC} component={withSession(MiscPage)} />
          <Route exact path={ROUTES.EVENTS} component={withSession(EventsPage)} />
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
          <Route exact path={ROUTES.DESK_HOME} component={deskOnly(DeskHome)} />
          <Route exact path={ROUTES.ALL_PACKAGES} component={deskOnly(AllPackages)} />
          <Route exact path={ROUTES.SEARCH_PACKAGES} component={deskOnly(SearchPackages)} />
          <Route exact path={ROUTES.REGISTER_PACKAGES} component={deskOnly(RegisterPackages)} />
          <Route exact path={ROUTES.DESK_CHECKOUT} component={deskOnly(DeskCheckout)} />
          <Route exact path={ROUTES.DESK_GUEST_LIST} component={deskOnly(DeskGuestList)} />
          <Route exact path={ROUTES.DESK_ITEM_RETURN} component={deskOnly(ItemReturn)} />
          <Route exact path={ROUTES.DESK_ADD_ITEM} component={deskCaptainOnly(AddDeskItem)} />
          <Route exact path={ROUTES.PACKAGES} component={withAuthentication(UserPackagePage)} />
          <Route exact path={ROUTES.LOANS} component={withAuthentication(UserItemLoanPage)} />
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
