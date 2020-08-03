import React, { Component } from "react"
import LoadingSpinner from "../../../../components/LoadingSpinner"
import axiosInstance from "../../../../axiosInstance"
import UserTable from "../../../../components/StripedTable"

class Summaries extends Component {

  constructor(props) {
    super(props)
    this.state = {groups: []}
  }

  componentDidMount() {
    this.setState({loading: true})
    axiosInstance.get("/api/accounts")
    .then(result => {
      this.setState({loading: false, groups: result.data})
    })
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner color="black" />;
    }

    return (
      this.state.groups.map((group, index) => {
        return (<div key={index}>
          <h2>{group.name}</h2>
          <UserTable rows={group.accounts.map(account => [account.name, account.balance])} headers={["Account", "Balance"]} />
          <br />
        </div>)
      })
    )
  };
}

export default Summaries
