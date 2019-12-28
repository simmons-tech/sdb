import React from 'react'
import Nav from './components/Nav';
import axios from "./axiosInstance";
import LoginForm from './components/LoginForm';
import * as ROUTES from './constants/routes';

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
      <main className="content">
        <Nav {... this.props} />
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <LoginForm handle_login={this.handle_login} errors={this.state.errors} />
      </main>
    );
  }
}
export default LoginPage