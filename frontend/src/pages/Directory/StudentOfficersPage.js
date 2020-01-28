import React, { Component } from "react";
import BasePage from "../BasePage";
import UserTable from "../../components/UserTable";
import axios from "../../axiosInstance";

class StudentOfficersPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, rows: [] };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get("/api/officers/").then(res => {
      this.setState({
        loading: false,
        rows: res.data.map(item =>
          // We show the "Title" of the position instead of the position
          // name (which is for record keeping purpsoes)
          [
            item.title,
            item.user.display_name,
            item.user.room.number,
            <a href={"mailto:" + item.user.email}>{item.user.email}</a>
          ]
        )
      });
    });
  }

  render() {
    return (
      <BasePage loading={this.state.loading}>
        <UserTable
          rows={this.state.rows}
          headers={["Position", "Name", "Room", "Email"]}
        />
      </BasePage>
    );
  }
}
export default StudentOfficersPage;
