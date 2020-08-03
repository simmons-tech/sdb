import React from 'react';
import BasePage from './BasePage';
import axios from "../axiosInstance";
import SignupForm from '../components/SignupForm';

class SignupPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

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
      .post('/api/users/', data)
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
      <BasePage header="" {... this.props} >
        <SignupForm handle_signup={this.handle_signup} errors={this.state.errors} />
      </BasePage>
    );
  }
}
export default SignupPage