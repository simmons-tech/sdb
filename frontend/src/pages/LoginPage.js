import React from 'react'
import axios from "../axiosInstance";
import BasePage from './BasePage';
import LoginForm from '../components/LoginForm';
import saveToken from '../login';
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
      this.props.history.push(ROUTES.HOME);
    }
  };

  componentDidUpdate(nextProps) {
    if (this.props.loginToken) {
      this.props.history.push(ROUTES.HOME);
    }
  };

  handle_login = (data) => {
    axios
      .post('/token_auth/', data)
      .then(res => {
        saveToken(res.data, this.props.history);
      })
      .catch((e) => {
        console.log(e)
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