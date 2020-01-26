import React, { Component } from "react";
import BasePage from '../BasePage';
import UserTable from "../../components/UserTable";
import axios from '../../axiosInstance';

export default class StudentGroupPage extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, results: [] };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(this.props.endpoint)
      .then(res => {
        this.setState({ loading: false, results: res.data.map(item => item.user) });
      });
  }
  render() {
    let results = this.state.results;
    return (<BasePage loading={this.state.loading} header="" {...this.props}>
      {this.props.description}
      <UserTable rows={results} columns={['display_name', 'room', 'email']} headers={['Name', 'Room', 'Email']} />
    </BasePage>);
  }
}
