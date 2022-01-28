import React from "react";
import {
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PrimaryButton from './primaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { withTheme } from 'styled-components';
import AuthLinks from './authLinks';

function SidebarPrimary(props) {
  console.log(props);
  return (
    <div id="sidebar-primary" className={`sidebar ${props.open ? "active" : ""}`}>
      <Nav>
        <PrimaryButton color={props.theme.sidebarColorsOrder[0]}>
          <NavItem>
            <NavLink onClick={(e) => props.onClick(e, 0)} href="#">
              {props.headers[0]} <FontAwesomeIcon
                className="sidebar-primary-arrow"
                icon={faArrowCircleRight} />
            </NavLink>
          </NavItem>
        </PrimaryButton>
        <PrimaryButton color={props.theme.sidebarColorsOrder[1]}>
          <NavItem>
            <NavLink onClick={(e) => props.onClick(e, 1)} href="#">
              {props.headers[1]} <FontAwesomeIcon
                className="sidebar-primary-arrow"
                icon={faArrowCircleRight} />
            </NavLink>
          </NavItem>
        </PrimaryButton>
        <PrimaryButton color={props.theme.sidebarColorsOrder[2]}>
          <NavItem>
            <NavLink onClick={(e) => props.onClick(e, 2)} href="#">
              {props.headers[2]} <FontAwesomeIcon
                className="sidebar-primary-arrow"
                icon={faArrowCircleRight} />
            </NavLink>
          </NavItem>
        </PrimaryButton>
        <PrimaryButton color={props.theme.sidebarColorsOrder[3]}>
          <NavItem>
            <NavLink onClick={(e) => props.onClick(e, 3)} href="#">
              {props.headers[3]} <FontAwesomeIcon
                className="sidebar-primary-arrow"
                icon={faArrowCircleRight} />
            </NavLink>
          </NavItem>
        </PrimaryButton>
        { props.isAdmin &&
          <PrimaryButton color={props.theme.sidebarColorsOrder[4]}>
          <NavItem>
            <NavLink onClick={(e) => props.onClick(e, 4)} href="#">
              {props.headers[4]} <FontAwesomeIcon
                className="sidebar-primary-arrow"
                icon={faArrowCircleRight} />
            </NavLink>
          </NavItem>
        </PrimaryButton>
        }
        { props.isDeskWorker &&
          <PrimaryButton color={props.theme.sidebarColorsOrder[5]}>
            <NavItem>
              <NavLink onClick={(e) => props.onClick(e, 5)} href="#">
                {props.headers[5]} <FontAwesomeIcon
                  className="sidebar-primary-arrow"
                  icon={faArrowCircleRight} />
              </NavLink>
            </NavItem>
          </PrimaryButton>
        }
      </Nav>
      <div className="auth-links">
        <AuthLinks {...props} />
      </div>
    </div>
  );
}

export default withTheme(SidebarPrimary)
