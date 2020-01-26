import React from "react";
import withAuthentication from "./withAuthentication";
import * as ROUTES from '../constants/routes';

export default function adminOnly(PageComponent) {

  return withAuthentication(class extends React.Component {

    componentDidMount() {
      if (!this.props.isAdmin) {
        // TODO: make a "authentication error" page to go to
        this.props.history.push(ROUTES.HOME);
      }
    };

    componentDidUpdate(nextProps) {
      if (!this.props.isAdmin) {
        this.props.history.push(ROUTES.HOME);
      }
    };

    render() {
      return <PageComponent {...this.props} />;
    }
  })
}