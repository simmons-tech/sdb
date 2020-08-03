import React from 'react';
import  { Redirect } from 'react-router-dom'
import * as ROUTES from '../constants/routes'


class SignoutPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentDidMount() {
    localStorage.clear()
  };


  render() {
    return (
      <Redirect to={ROUTES.LOGIN} />
    );
  }
}
export default SignoutPage