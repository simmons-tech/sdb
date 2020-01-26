import React, { Component } from "react";
import BasePage from "../BasePage";
import UserTable from "../../components/UserTable";
import axios from "../../axiosInstance";

class StudentOfficersPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, results: [] };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get("/api/officers/").then(res => {
      console.log(res);
      this.setState({ loading: false, results: res.data });
    });
  }

  render() {
    // Need to do some flattening to work with the UserTable
    // We show the "Title" of the position instead of the position
    // name (which is for record keeping purpsoes)
    let results = this.state.results.map(result => {
      return {
        position: result.title,
        display_name: result.user.display_name,
        room: result.user.room,
        email: result.user.email
      };
    });

    return (
      <BasePage loading={this.state.loading} header="" {...this.props}>
        <UserTable
          rows={results}
          columns={["position", "display_name", "room", "email"]}
          headers={["Position", "Name", "Room", "Email"]}
        />
      </BasePage>
    );
  }
}
export default StudentOfficersPage;
