import React, { Component } from "react";
import BasePage from '../BasePage';
import UserTable from "../../components/UserTable"
import axios from '../../axiosInstance';


class MedlinkPage extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: true, results: []}
  }

  componentDidMount() {
    this.setState({ loading: true});
    axios
      .get("/api/medlinks/")
      .then(res => {
        this.setState({ loading: false, results: res.data })
      })
  }

  render() {
    let results = this.state.results
    return (
      <BasePage loading={this.state.loading} header="" {... this.props} >
        <p>
        Medlinks serve as liaisons between undergraduate students and MIT Medical. 
        They can answer questions about MIT Medical's policies and services and can 
        help you figure out when and how to connect with other MIT resources. They 
        can also provide single doses of common over-the-counter medications, first-aid 
        materials, and safer-sex supplies.

        To reach out to all Simmons Medlinks, email <a href="mailto:simmons-medlinks@mit.edu">simmons-medlinks@mit.edu</a>.
        </p>
        <UserTable
          rows={results}
          columns={['display_name', 'room', 'email']}
          headers={['Name', 'Room', 'Email']}
        />
      </BasePage>
    );
  }
}
export default MedlinkPage;
