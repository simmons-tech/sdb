import React, { Component } from "react";
import BasePage from "../BasePage";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

class OpenProposalsPage extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: true, proposals: [] };
  }

  componentDidMount() {
    this.setState({ loading: false });
    axios.get("/api/proposals/")
    .then(res => {
      this.setState({
        proposals: res.data.map(item =>
          [
            item.title,
            item.decision,
            item.primary_author,
          ]
        )
      });
    });
  }

  render() {
    return(
      <BasePage loading={this.state.loading}>
        <h2>Open Proposals</h2>
        <UserTable
            rows={this.state.proposals}
            headers={["Title", "Decision", "Authors"]}
          />

          <br />

      </BasePage>
    )
  }
};

export default OpenProposalsPage;