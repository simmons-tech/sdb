import React from "react";
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom'
import './Sidebar.css';
import SidebarPrimary from './primary';
import SidebarSecondary from './secondary';
import * as ROUTES from '../../constants/routes'

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      primaryOpen: false,
      secondaryIndex: 0
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref for detecting clicking outside
   */
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  /**
   * If clicked outside, close sidebar wrapper (if open) on mobile
   */
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (!this.props.open) {
        this.props.toggleSidebar()
      }
    }
  }

  /**
   * Open the secondary sidebar for the given index. Closes primary
   * sidebar as a side effect.
   */
  openSecondary = (e, index) => {
    e.preventDefault()
    this.setState({ primaryOpen: false, secondaryIndex: index })
  }

  /**
   * Open the primary sidebar. Closes te open secondary sidebar as
   * a side effect.
   */
  openPrimary = (e) => {
    e.preventDefault()
    this.setState({ primaryOpen: true })
  }

  /**
   * Log out and return to login page
   */
  handle_logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }


  headers = [
    "Home",
    "House Gov",
    "Lounges",
    "Directories"
  ]

  links = [
    [
      { url: ROUTES.HOME, name: "Home" },
      { url: ROUTES.PROFILE, name: "My Profile" },
      { url: ROUTES.GUEST_LIST, name: "Guest List" },
      { url: ROUTES.PACKAGES, name: "My Packages" },
      { url: ROUTES.LOANS, name: "My Loans" },
      { url: ROUTES.MAILING_LISTS, name: "Mailing Lists" },
      { url: ROUTES.POLLS, name: "Votes and Polls" },
      { url: ROUTES.LOTTERIES, name: "Lotteries" },
      { url: ROUTES.MOVIES, name: "Desk Movies List" },
      { url: ROUTES.LIBRARY, name: "Library Catalog" },
      { url: ROUTES.ABOUT, name: "About the DB" },
    ],
    [
      { url: ROUTES.HOUSE_FINANCES, name: "House Finances" },
      { url: ROUTES.MEETINGS, name: "House Meetings" },
      { url: ROUTES.SUBMIT_PROPOSAL, name: "Submit Proposal" },
    ],
    [
      { url: ROUTES.ANNOUNCEMENTS, name: "Announcements" },
      { url: ROUTES.MY_LOUNGE, name: "My Lounge" },
      { url: ROUTES.LOUNGE_DIR, name: "Lounge Directory" },
      { url: ROUTES.CREATE_LOUNGE, name: "Create Lounge" },
      { url: ROUTES.CREATE_LOUNGE_EVENT, name: "Create Lounge Event" },
      { url: ROUTES.LOUNGE_EXPENSES, name: "All Lounge Expenses" },
      { url: ROUTES.LOUNGE_EVENTS, name: "All Lounge Events" },
    ],
    [
      { url: ROUTES.RESIDENT_DIRECTORY, name: "Resident Directory" },
      { url: ROUTES.OFFICERS, name: "Student Officers" },
      { url: ROUTES.MEDLINKS, name: "Medlinks" },
      { url: ROUTES.ADVISORS, name: "Associate Advisors" },
      { url: ROUTES.GRAS, name: "GRAs" },
    ]
  ]

  render() {
    const secondaryIndex = this.state.secondaryIndex;

    return (
      <div ref={this.setWrapperRef} id="sidebar-wrapper" className={`sidebar ${this.props.open ? "" : "active"}`}>
        <SidebarPrimary
          headers={this.headers}
          onClick={this.openSecondary}
          open={this.state.primaryOpen} />
        <SidebarSecondary
          onClick={this.openPrimary}
          color={this.props.theme.sidebarColorsOrder[secondaryIndex]}
          header={this.headers[secondaryIndex]}
          open={!this.state.primaryOpen}
          items={this.links[secondaryIndex]}
          logged_in={this.props.loginToken ? true : false}
        />
      </div>
    );
  }
}

export default withTheme(withRouter(Sidebar));
