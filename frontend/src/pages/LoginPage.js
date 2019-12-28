import React from 'react'
import axios from "../axiosInstance";
import BasePage from './BasePage';
import LoginForm from '../components/LoginForm';
import * as ROUTES from '../constants/routes';

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentDidMount() {
    if (this.props.loginToken) {
      this.props.history.push(ROUTES.LANDING);
    }
  };

  componentDidUpdate(nextProps) {
    if (this.props.loginToken) {
      this.props.history.push(ROUTES.LANDING);
    }
  };

  saveToken = (data) => {
    localStorage.setItem('token', data);
    if (this.props.history.location.state && this.props.history.location.state.goBack) {
      this.props.history.goBack();
    } else {
      this.props.history.push(ROUTES.LANDING)
    }
  }

  handle_login = (data) => {
    axios
      .post('/token-auth/', data)
      .then(res => {
        this.saveToken(res.data.token);
      })
      .catch((e) => {
        this.setState({
          errors: Object.values(e.response.data).reduce((a, element) => a.concat(element), [])
        });
      })
  };

  render() {
    return (
      <BasePage header="Login" {... this.props} >
        <LoginForm handle_login={this.handle_login} errors={this.state.errors} />
      </BasePage>
    );
  }
}
export default LoginPage