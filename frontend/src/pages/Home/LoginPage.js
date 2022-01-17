import React from 'react'
import axios from "../../axiosInstance";
import BasePage from '../BasePage';
import saveToken from '../../login';
import * as ROUTES from '../../constants/routes';

import {
  Alert,
  Button
} from "reactstrap";

class LoginPage extends React.Component {



  constructor(props) {
    super(props)
    this.state = {
      hasErrors: false,
      loading: false,
    }
  }

  getOidcAccessToken(code) {
    const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", process.env.REACT_APP_OPENID_REDIRECT);
      // Get the access token and handle login
      axios
        .post("https://oidc.mit.edu/token", params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: process.env.REACT_APP_OPENID_ID,
            password: process.env.REACT_APP_OPENID_SECRET
          }
        })
        .then(async (res) => {
          await this.handleLogin(res.data)
        });
  }

  certLogin = () => {
    this.setState({ loading: true });
    // Redirect for Touchstone login
    window.location.replace("https://oidc.mit.edu/authorize" +
      `?client_id=${process.env.REACT_APP_OPENID_ID}` +
      "&response_type=code" + 
      `&redirect_uri=${process.env.REACT_APP_OPENID_REDIRECT}` +
      `&state=${(Math.random() + 1).toString(36).substring(2)}` +
      `&nonce=${(Math.random() + 1).toString(36).substring(2)}`)
  }

  componentDidMount() {
    if (this.props.loginToken) {
      this.props.history.push(ROUTES.HOME);
    }
    console.log("Here!");
    // Check for `code` in query parameter for Touchstone
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams.has("code")) {
      this.setState({ loading: true });
      this.getOidcAccessToken(urlSearchParams.get("code"));
    }
  };

  componentDidUpdate(nextProps) {
    if (this.props.loginToken) {
      this.props.history.push(ROUTES.HOME);
    }
  };

  async handleLogin(token) {
    try {
      await saveToken(token, this.props.history);
    } catch (e) {
      // Clear query params
      window.history.pushState({}, document.title, "/login");
      // Alert user that they can't log in
      this.setState({
        loading: false,
        error: "You are not a Simmons resident >:("
      });
    }
  };

  render() {
    return (
      <BasePage {... this.props} >
        { this.state.loading ? <p>Logging you in...</p> :
        <div>
          { this.state.error ? <Alert color="danger">
            <span>{ this.state.error }</span>
          </Alert> : <></> }
          <h2 className="mb-3">Welcome to the Simmons DB!</h2>
          <Button type="button" onClick={this.certLogin} className="mb-3">Click here to login</Button>
          <p>Please note that only <u>Simmons residents</u> may login.</p>
        </div> }
      </BasePage>
    );
  }
}
export default LoginPage
