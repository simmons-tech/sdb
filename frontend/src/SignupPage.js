import React from 'react'
import Nav from './components/Nav';
import axios from "./axiosInstance";
import SignupForm from './components/SignupForm'

class SignupPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  componentDidMount() {
    if (this.props.loginToken) {
      this.props.history.push("/");
    }
  };

  componentDidUpdate(nextProps) {
    if (this.props.loginToken) {
      this.props.history.push("/");
    }
  };

  saveToken = (data) => {
    localStorage.setItem('token', data);
    if (this.props.history.location.state && this.props.history.location.state.goBack) {
      this.props.history.goBack();
    } else {
      this.props.history.push('/')
    }
  }

  handle_signup = (data) => {
    axios
      .post('/users/', data)
      .then(res => {
        this.saveToken(res.data.token);
      })
      .catch((e) => {
        console.log(e);
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
        <SignupForm handle_signup={this.handle_signup} errors={this.state.errors} />
      </main>
    );
  }
}
export default SignupPage