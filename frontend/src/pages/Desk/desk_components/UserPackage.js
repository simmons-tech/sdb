import React, { Component } from "react";
import {Button, Jumbotron } from "reactstrap"
import InteractiveUserTable from "./InteractiveUserTable";

import axios from '../../../axiosInstance';


class UserPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {packages:[]}
    }


    componentDidMount() {
        axios
          .post('/api/packages/user_packages/',{recipient:{username: this.props.user.username}})
          .then(res => {
            console.log(res);
            this.setState({packages: res.data.map(item => 
                    [
                        item.log_time,
                        item.location,
                        (item.perishable) ? "Yes" : "No",
                        item.quantity,
                        <Button>Pick Up</Button>
                    ]
                )})
          })
    }

    handlePickUp = () => {
        // handles picking up the packages
    }

    render() {
        return (
            <Jumbotron>
                <h4>Packages for {this.props.user.display_name}</h4>
                <Button onClick = {this.props.back}>Back</Button>
                <InteractiveUserTable 
                    rows = {this.state.packages}
                    headers = {["Checked In", "Bin", "Perishable", "# of Packages", "Pick Up?"]}
                />
                <Button>Pick Up</Button>
            </Jumbotron>
        );
    }
}

export default UserPackage;