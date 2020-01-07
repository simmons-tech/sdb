import React, { Component } from "react";
import BasePage from '../BasePage';
import UserTable from "../../components/UserTable"
import axios from '../../axiosInstance';


class AssociateAdvisorPage extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: true, results: []}
  }

  componentDidMount() {
    this.setState({ loading: true});
    axios
      .get("/api/associateadvisors/")
      .then(res => {
        this.setState({ loading: false, results: res.data })
      })
  }

  render() {
    let results = this.state.results
    return (
      <BasePage loading={this.state.loading} header="" {... this.props} >
        <p>
        Associate Advisors are student representatives of the UAAP whose 
        job is to help freshmen adjust to MIT. If you're a freshmen and have questions about anything, ranging from student life to academics, feel free to reach out to us!
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
export default AssociateAdvisorPage;
