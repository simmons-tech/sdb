import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";

class Topbar extends React.Component {
  render() {
    return (
      <Navbar color="faded" light className="navbar-expand-md">
        <NavbarToggler onClick={this.props.toggleSidebar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
      </Navbar>
    );
  }
}

export default Topbar;