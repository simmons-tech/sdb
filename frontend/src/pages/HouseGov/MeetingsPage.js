import React, { Component } from "react";
import BasePage from '../BasePage';
import { Jumbotron, Navbar, NavbarToggler, Nav, NavbarText, NavItem, NavLink } from "reactstrap";
import MPR from "../../static/img/mpr.jpg";

const TODO = "/undef"

class MeetingsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: false}
  }

  render() {
    return (
      <BasePage loading={this.state.loading}>
      {/* <img src={MPR}/> */}
        <Navbar color="light">
          <NavLink href={TODO}>View Upcoming Meeting Agenda</NavLink>|
          <NavLink href={TODO}>View Open Proposals</NavLink>|
          <NavLink href={TODO}>View Deleted Proposals</NavLink>|
          <NavLink href="../submit">Submit Proposal</NavLink>|
          <NavLink href={TODO}>Policy Search</NavLink>
        </Navbar>
        <Jumbotron>
          <h1>Past meetings</h1>
          insert list here
        </Jumbotron>
      </BasePage>
    );
  }
}
export default MeetingsPage;