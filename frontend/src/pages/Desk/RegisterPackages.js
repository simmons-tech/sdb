import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Button } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserSearch from "./desk_components/UserSearch";
import axios from "../../axiosInstance";

class RegisterPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, added_packages: [] };
    }

    // onUserQuery = (values, callback) => {
    //     // TODO this is probably wrong with the backend, but fix later
    //     axios.get("/api/users/", values).then(res => {
    //         this.setState({
    //             loading: false,
    //             users: res.data.map(user =>
    //                 [
    //                     user.first_name,
    //                     user.last_name,
    //                     user.title,
    //                     user.username,
    //                     user.room,
    //                     user.year
    //                 ]
    //             )
    //         });
    //     });
    //     callback();
    // }


    handleAddPackage = () => {
        // link to a add package page with a UserQuery

    }

    handleDeleteAll = () => {
        // delete all currently added packages
        this.setState({ added_packages: [] })
    }

    handleRegisterPackages = () => {
        // used to send a register added packages. 
    }

    handleOnClick = (row) => {
        // used to edit or delete a entry
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Package Pickup">
                <Button onClick={this.handleAddPackage}>Add Package</Button>
                {this.state.added_packages.length ?
                    <Jumbotron>
                        <InteractiveUserTable>
                            rows = {this.added_packages}
                            headers = {["Recipient", "Bin", "Packages", "Perishable"]}
                            handleOnClick = {this.handleOnClick}
                        </InteractiveUserTable>
                        <Button onClick={this.handleRegisterPackages}>Register Packages</Button>
                        <Button onClick={this.handleDeleteAll}>Delete All</Button>
                    </Jumbotron>
                    :
                    <h2>No Pending Package Submissions</h2>
                }
            </BasePage>
        );
    }
}

export default RegisterPackages;