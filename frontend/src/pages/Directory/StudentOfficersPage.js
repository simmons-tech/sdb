import React, { Component } from "react";
import BasePage from '../BasePage';
import UserTable from "../../components/UserTable"
import axios from '../../axiosInstance';


class StudentOfficersPage extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: true, results: []}
  }

  componentDidMount() {
    this.setState({ loading: true});
    axios
      .get("/api/officers/")
      .then(res => {
        this.setState({ loading: false, results: res.data })
      })
  }

  render() {
    let results = this.state.results
    // Unfortunately, "Title" refers to the "Position" column...
    return (
      <BasePage loading={this.state.loading} header="" {... this.props} >
        <UserTable
          rows={results}
          columns={['title', 'display_name', 'room', 'email']}
          headers={['Position', 'Name', 'Room', 'Email']}
        />
      </BasePage>
    );
  }
}
export default StudentOfficersPage;
