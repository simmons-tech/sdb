import React from "react";
import axios from "../../axiosInstance";
import BasePage from "../BasePage";
import LoginForm from "../../components/LoginForm";
import { saveOidcToken, saveJwtToken } from "../../login";
import * as ROUTES from "../../constants/routes";

import { Alert, Button, Container, Row, Col } from "reactstrap";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jwtErrors: [],
      oidcError: null,
      loading: false,
    };
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
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.REACT_APP_OPENID_ID,
          password: process.env.REACT_APP_OPENID_SECRET,
        },
      })
      .then(async (res) => {
        await this.handleOidcLogin(res.data);
      });
  }

  certLogin = () => {
    this.setState({ loading: true });
    // Redirect for Touchstone login
    window.location.replace(
      "https://oidc.mit.edu/authorize" +
        `?client_id=${process.env.REACT_APP_OPENID_ID}` +
        "&response_type=code" +
        `&redirect_uri=${process.env.REACT_APP_OPENID_REDIRECT}` +
        `&state=${(Math.random() + 1).toString(36).substring(2)}` +
        `&nonce=${(Math.random() + 1).toString(36).substring(2)}`
    );
  };

  componentDidMount() {
    if (this.props.loginToken) {
      this.props.history.push(ROUTES.HOME);
    }
    // Check for `code` in query parameter for Touchstone
    const urlSearchParams = new URLSearchParams(window.location.search);
    if (urlSearchParams.has("code")) {
      this.setState({ loading: true });
      this.getOidcAccessToken(urlSearchParams.get("code"));
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.loginToken) {
      this.props.history.push(ROUTES.HOME);
    }
  }

  async handleOidcLogin(token) {
    try {
      await saveOidcToken(token, this.props.history);
    } catch (e) {
      // Clear query params
      window.history.pushState({}, document.title, "/login");
      // Alert user that they can't log in
      this.setState({
        loading: false,
        oidcError: "You are not a Simmons resident >:(",
      });
    }
  }

  handleJwtLogin = (data) => {
    axios
      .post("/token_auth/", data)
      .then((res) => {
        saveJwtToken(res.data, this.props.history);
      })
      .catch((e) => {
        this.setState({
          errors: Object.values(e.response.data).reduce(
            (a, element) => a.concat(element),
            []
          ),
        });
      });
  }

  render() {
    return (
      <BasePage {...this.props}>
        {this.state.loading ? (
          <p>Logging you in...</p>
        ) : (
          <div>
            {this.state.oidcError ? (
              <Alert color="danger">
                <span>{this.state.oidcError}</span>
              </Alert>
            ) : (
              <></>
            )}
            <h2 className="mb-3">Welcome to the Simmons DB!</h2>
            <p>
              You can login using your MIT credentials, or with a
              username/password pair after your first login.
            </p>
            <Container fluid>
              <Row>
                <Col md="6" sm="12" xs="12">
                  <Button
                    type="button"
                    onClick={this.certLogin}
                    className="mb-3"
                  >
                    Login with MIT credentials
                  </Button>
                </Col>
                <Col md="6" sm="12" xs="12">
                  <LoginForm
                    handle_login={this.handleJwtLogin}
                    errors={this.state.jwtErrors}
                  />
                </Col>
              </Row>
            </Container>
            <p>
              Please note that only <u>Simmons residents</u> may login.
            </p>
          </div>
        )}
      </BasePage>
    );
  }
}
export default LoginPage;
