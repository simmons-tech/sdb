import React, { Component } from "react";
import BasePage from "../BasePage";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

export default class StudentGroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, rows: [] };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(this.props.endpoint).then(res => {
      console.log(res.data)
      this.setState({
        loading: false,
        rows: res.data.map(item => [
          item.display_name,
          item.room.number,
          <a href={"mailto:" + item.email}>{item.email}</a>
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
