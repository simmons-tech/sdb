import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Button, Row, Col } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserSearch from "./desk_components/UserSearch";
import axios from "../../axiosInstance";

class RegisterPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, add_package: false, added_packages: [], users: [], searched: false};
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

    handleRegisterAllPackages = () => {
        // used to send a register all added packages. 
        // add desk_worker to the submission
    }

    handleUserQueryOnClick = (row) => {
        // used to edit or delete a entry
        let username = row[3];

    }

    handleAddedPackageOnClick = (row) => {

    }

    handleAddPackage = (values) =>{
        // used to add a package in the state. Does not register them to the DB yet
        // TODO check if values contain recipient, location, quantity, and perishable
        this.setState({added_packages:[...this.state.added_packages,...values]})
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Register Packages">
                {this.state.added_packages.length ?
                    <Jumbotron>
                        <Button onClick={this.handleRegisterAllPackages}>Register Packages</Button>
                        <Button onClick={this.handleDeleteAll}>Delete All</Button>
                        <InteractiveUserTable 
                            rows = {this.state.added_packages}
                            headers = {["Recipient", "Bin", "Packages", "Perishable"]}
                            handleOnClick = {this.handleAddedPackageOnClick}
                        />
                    </Jumbotron>
                    :
                    <h2>No Pending Package Submissions</h2>
                }
                {this.state.add_package ? 
                <Row>
                    <Col>
                        <UserSearch onQuery={this.onUserQuery} {...this.props} />
                    </Col>
                    <Col>
                        <Jumbotron>
                            {(this.state.users.length) ? 
                                <div>
                                    <h4>Select a resident to register the package for:</h4>
                                    <InteractiveUserTable
                                        rows = {this.state.users}
                                        headers = {["Last", "First", "Title", "Username", "Room", "Year"]}
                                        handleOnClick = {this.handleUserQueryOnClick}
                                    />
                                </div>
                            : 
                                (this.state.searched) ? 
                                    <h4>No resident matched your query.</h4>
                                    :
                                    <h4>Search for a resident. Results will appear here.</h4>
                            }
                        </Jumbotron>
                    </Col>
                </Row>
                :
                <Button onClick={()=>this.setState({add_package: true})}>Add Package</Button>
                }

            </BasePage>
        );
    }
}

export default RegisterPackages;