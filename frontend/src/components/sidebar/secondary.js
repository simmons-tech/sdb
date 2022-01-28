import React, {Fragment} from "react";
import {
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import SecondaryBackButton from './secondaryBackButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import * as ROUTES from '../../constants/routes';
import AuthLinks from './authLinks';

export default function SidebarSecondary(props) {
  console.log(props);

  const loginLink = <NavItem>
    <NavLink href={ROUTES.LOGIN}>Login</NavLink>
  </NavItem>

  const signoutLink = <Fragment>
      <NavItem>
        <NavLink href="">
          Logged in as {props.user && props.user.username}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={ROUTES.SIGN_OUT}>Sign out</NavLink>
      </NavItem>
    </Fragment>

  return (
    <div id="sidebar-secondary" className={`sidebar ${props.open ? "active" : ""}`}>
      <Nav>
        <SecondaryBackButton color={props.color}>
          <NavItem id={props.backId}>
            <NavLink onClick={props.onClick} href="#">
              {props.header} <FontAwesomeIcon
                className="sidebar-secondary-arrow"
                icon={faArrowCircleLeft} />
            </NavLink>
          </NavItem>
        </SecondaryBackButton>
        {
          props.items
              .filter(item => {

                  // don't display admin pages to non-admin
                  if (item.adminOnly && !props.isAdmin) {
                      return false;
                  }

                  // don't display desk pages to non-desk workers
                  if (item.deskOnly && !(props.isDeskWorker || props.isDeskCaptain)) {
                      return false;
                  }

                  // don't display desk captain pages to non-captains
                  if (item.deskCaptainOnly && !props.isDeskCaptain) {
                      return false;
                  }

                  return true;
              })
              .map((item, indx) => (
                <NavItem key={indx}>
                  <NavLink href={item.url}>{item.name}</NavLink>
                </NavItem>
              ))
        }
      </Nav>
      <div className="auth-links">
        <AuthLinks {...props} />
      </div>
    </div>
  );
}
