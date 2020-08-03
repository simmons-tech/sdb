import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import logo from '../static/img/logo.png';
import styled, {withTheme} from 'styled-components';

function Topbar(props) {

  let color = props.theme.sidebarColorsOrder[props.colorIndex]

  const StyledNavbar = styled(Navbar)`
    font-size:25px !important;
    height: ${props.theme.navbarHeight};
    background-color: ${props.theme.topbarColors[color]};
    border: none;
  `

  const title = props.title ? props.title : "SimDB"

  return (
    <StyledNavbar color="faded" dark  className="navbar-expand-md">
      <NavbarToggler onClick={props.toggleSidebar} className="no-border mr-2" />
      <NavbarBrand href="#" id="topbar-title" className="mr-auto">{title}</NavbarBrand>
      <img src={logo} width="50px" alt="" />
    </StyledNavbar>
  );
}

export default withTheme(Topbar);