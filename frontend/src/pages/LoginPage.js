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

  parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

  saveToken = (data) => {
    let payload = this.parseJwt(data.access)
    localStorage.setItem('token', data.access);
    localStorage.setItem('refresh_token', data.refresh)
    localStorage.setItem('username', payload.username)
    localStorage.setItem('is_admin', payload.is_admin)
    if (this.props.history.location.state && this.props.history.location.state.goBack) {
      this.props.history.goBack();
    } else {
      this.props.history.push(ROUTES.LANDING)
    }
  }

  handle_login = (data) => {
    axios
      .post('/token_auth/', data)
      .then(res => {
        console.log(res)
        this.saveToken(res.data);
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