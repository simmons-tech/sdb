import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Button } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserSearch from "./desk_components/UserSearch";
import axios from "../../axiosInstance";

class RegisterPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, add_package: false, added_packages: [] };
    }

    onUserQuery = (values, callback) => {
        axios.get("/api/users/advanced_search/", {params: values}).then(res => {
            this.setState({
                loading: false,
                users: res.data.map(user =>
                    [
                        user.last_name,
                        user.first_name,
                        user.title,
                        user.username,
                        (user.room) ? user.room.number : null,
                        user.year
                    ]
                ),
                searched: true
            });
        });
        callback();
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
            <BasePage loading={this.state.loading} header="Register Packages">
                {this.state.added_packages.length ?
                    <Jumbotron>
                        <Button onClick={this.handleRegisterPackages}>Register Packages</Button>
                        <Button onClick={this.handleDeleteAll}>Delete All</Button>
                        <InteractiveUserTable>
                            rows = {this.added_packages}
                            headers = {["Recipient", "Bin", "Packages", "Perishable"]}
                            handleOnClick = {this.handleOnClick}
                        </InteractiveUserTable>
                    </Jumbotron>
                    :
                    <h2>No Pending Package Submissions</h2>
                }
                {this.state.add_package ? 
                <UserSearch onQuery={this.onUserQuery} {...this.props} />
                :
                <Button onClick={()=>this.setState({add_package: true})}>Add Package</Button>
                }

            </BasePage>
        );
    }
}

export default RegisterPackages;