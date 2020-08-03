import React from "react";
import { withRouter } from 'react-router-dom'
import withSession from "./withSession";
import * as ROUTES from '../constants/routes';

export default function withAuthentication(PageComponent) {

  return withSession(withRouter(class extends React.Component {

    componentDidMount() {
      if (!this.props.loginToken) {
        this.props.history.push(ROUTES.LOGIN, { goBack: true });
      }
    };

    componentDidUpdate(nextProps) {
      if (!this.props.loginToken) {
        this.props.history.push(ROUTES.LOGIN, { goBack: true });
      }
    };

    render() {
      return <PageComponent {...this.props} />;
    }
  }))
}