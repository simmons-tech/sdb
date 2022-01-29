import React, { Fragment } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import * as ROUTES from "../../constants/routes";
import { stopImpersonating } from "../../login";

export default function AuthLinks(props) {
  const loginLink = (
    <NavItem>
      <NavLink href={ROUTES.LOGIN}>Login</NavLink>
    </NavItem>
  );

  const signoutLink = (
    <Fragment>
      {localStorage.getItem("impersonating") === "true" ? (
        <NavItem>
          <NavLink onClick={stopImpersonating} href="">
            Stop impersonating {props.user.username}
          </NavLink>
        </NavItem>
      ) : (
        <></>
      )}
      <NavItem>
        <NavLink href="">
          Logged in as {props.user && props.user.username}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href={ROUTES.SIGN_OUT}>Sign out</NavLink>
      </NavItem>
    </Fragment>
  );

  return <Nav className="foot">{props.user ? signoutLink : loginLink}</Nav>;
}
