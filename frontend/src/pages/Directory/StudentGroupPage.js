import React, { Component } from "react";
import BasePage from "../BasePage";
import UserTable from "../../components/UserTable";
import axios from "../../axiosInstance";

export default class StudentGroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, rows: [] };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(this.props.endpoint).then(res => {
      this.setState({
        loading: false,
        rows: res.data.map(item => [
          item.user.display_name,
          item.user.room.number,
          <a href={"mailto:" + item.user.email}>{item.user.email}</a>
        ])
      });
    });
  }

  render() {
    return (
      <BasePage loading={this.state.loading} header="" {...this.props}>
        {this.props.description}
        <UserTable rows={this.state.rows} headers={["Name", "Room", "Email"]} />
      </BasePage>
    );
  }
}
