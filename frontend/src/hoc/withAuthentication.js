import React from "react";
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../constants/routes';

export default function withAuthentication(PageComponent) {

  return withRouter(class extends React.Component {

    componentDidMount() {
      if (!localStorage.getItem('token')) {
        this.props.history.push(ROUTES.LOGIN, { goBack: true });
      }
    };

    componentDidUpdate(nextProps) {
      if (!localStorage.getItem('token')) {
        this.props.history.push(ROUTES.LOGIN, { goBack: true });
      }
    };

    render() {
      let loginToken = localStorage.getItem('token');
      return <PageComponent loginToken={loginToken} {...this.props} />;
    }
  })
}