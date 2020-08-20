import React from "react";
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom'
import withSession from '../../hoc/withSession'
import './Sidebar.css';
import SidebarPrimary from './primary';
import SidebarSecondary from './secondary';
import { CATEGORIES, LINKS } from '../../constants/nav';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      primaryOpen: false,
      secondaryIndex: props.colorIndex
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

  render() {
    const secondaryIndex = this.state.secondaryIndex;
    return (
      <div ref={this.setWrapperRef} id="sidebar-wrapper" className={`sidebar ${this.props.open ? "" : "active"}`}>
        <SidebarPrimary
          headers={CATEGORIES}
          onClick={this.openSecondary}
          open={this.state.primaryOpen}
          isAdmin={this.props.isAdmin}
          isDeskCaptain={this.props.isDeskCaptain}
          isDeskWorker={this.props.isDeskWorker}
        />
        <SidebarSecondary
          onClick={this.openPrimary}
          color={this.props.theme.sidebarColorsOrder[secondaryIndex]}
          header={CATEGORIES[secondaryIndex]}
          open={!this.state.primaryOpen}
          items={LINKS[secondaryIndex].filter(item =>
              !item.hidden &&
              (!item.adminOnly || item.adminOnly === this.props.isAdmin) &&
              (!item.deskOnly || item.deskOnly === this.props.isDeskWorker)
          )}
          user={this.props.user}
          isAdmin={this.props.isAdmin}
          isDeskCaptain={this.props.isDeskCaptain}
          isDeskWorker={this.props.isDeskWorker}
        />
      </div>
    );
  }
}

export default withSession(withTheme(withRouter(Sidebar)));
