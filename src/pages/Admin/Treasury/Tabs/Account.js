import React, { Component } from "react"
import LoadingSpinner from "../../../../components/LoadingSpinner"
import axiosInstance from "../../../../axiosInstance"
import { Form, Label, Input } from 'reactstrap';
import UserTable from "../../../../components/StripedTable"

class Account extends Component {

  constructor(props) {
    super(props)
    this.state = {groups: [], account: ''}
  }

  componentDidMount() {
    this.setState({loading: true})
    axiosInstance.get("/api/accounts")
    .then(result => {
      this.setState({loading: false, groups: result.data})
      
      // If a valid account name is passed in, then select it and load its data
      if (this.props.account && result.data.some(group => 
          group.accounts.some(account => account.name === this.props.account)
        ))
        {
          this.setState({account: this.props.account})
        }
    })
  }

  getAccount(name) {
    // TODO
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner color="black" />;
    }

    return (
        <div>
          <Form>
            <Label for="accountSelect">Account</Label>
            <Input type="select" name="account" id="accountSelect" value={this.state.account}>
              <option disabled={true} value="">(select account)</option>
              {
                this.state.groups.map((group, index) => {
                  return(
                    <optgroup key={index} label={group.name}>
                      {
                        group.accounts.map((account, index) => {
                          return (
                            <option key={index} value={account.name}>{account.name}</option>
                          )
                        })
                      }
                    </optgroup>
                  )
                })
              }
            </Input>
          </Form>
        </div>
    )
  };
}

export default Account
