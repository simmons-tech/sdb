import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Button, Row, Col } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserSearch from "./desk_components/UserSearch";
import AddPackageForm from "./desk_components/AddPackageForm";
import axios from "../../axiosInstance";

class RegisterPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false, 
            add_package: false, // when the add package button is pushed
            editing: false, // when a user is selected and editing out package info
            searched: false, // when a query has been made
            added_packages: [], // packages that have been logged, but not posted to the db yet
            users: [], // users from a query
            currently_editing:{
                last_name: "",
                first_name: "",
                title: "",
                username: ""
            },
            submission_progress:""
        };
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
        this.handleBackButton(); // clears the query table and form.
    }

    handleBackButton = () =>{
        // change current states
        this.setState({
            currently_editing:{
                last_name: "",
                first_name: "",
                title: "",
                username:""
            },
            editing: false,
        })
    }

    handleDeleteAll = () => {
        // delete all currently added packages
        this.setState({ added_packages: [] })
    }

    handleRegisterAllPackages = () => {
        // used to send a register all added packages. 
        // add desk_worker to the submission
        let list = []
        this.state.added_packages.forEach((values) => {
            let temp = {
                username: values[4],
                location: values[1],
                quantity: values[2],
                perishable: values[3]
            }
            list.push(temp);
        })
        let req = {
            desk_worker: {username: this.props.user.username},
            packages: list,
        }

        axios.post("/api/packages/log/", req).then(
            this.setState({
                submission_progress: "Sending to DB" 
            })
        );
        // resents the pages state
        this.setState({ 
            loading: false, 
            add_package: false, 
            editing: false, 
            searched: false, 
            added_packages: [], 
            users: [], 
            currently_editing:{
                last_name: "",
                first_name: "",
                title: "",
                username: ""
            },
            submission_progress: "All Saved!" 

        });
        
    }

    handleUserQueryOnClick = (row) => {
        // used to edit or delete a entry
        this.setState({
            currently_editing:{
                last_name: row[0],
                first_name: row[1],
                title: row[2],
                username: row[3]
            },
            editing: true,
        })

    }

    handleAddedPackageOnClick = (row) => {
        //for actions to make a row clickable
        // Empty for now on purpose
    }

    handleRowDelete = (index) => {
        // onclick action for delete button
        let items = [...this.state.added_packages];
        items.splice(index, 1);

        // used to reindex the delete button for each row. Could have a better solution.
        for(let i = 0; i < items.length; ++i){
            let item = items[i];
            item[5] = 
                <div>
                    <Button onClick = {() => this.handleRowDelete(i)}>Delete</Button>
                </div>  
            items[i] = item;
        }
        this.setState({added_packages: items});
    }

    handleAddPackage = (values, callback) => {
        // used to add a package in the state. Does not register them to the DB yet
        let index = this.state.added_packages.length;
        this.setState({added_packages:[...this.state.added_packages,[
            this.state.currently_editing.first_name + " " + this.state.currently_editing.last_name,
            values.bin,
            values.packages,
            (values.perishable) ? "Yes" : "No",
            this.state.currently_editing.username,
            <div>
                <Button onClick = {() => this.handleRowDelete(index)}>Delete</Button>
            </div> 
        ]
        ]})
        callback();
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
                            headers = {["Recipient", "Bin", "Packages", "Perishable", "Username", "Actions"]}
                            handleOnClick = {this.handleAddedPackageOnClick}
                        />
                        <h4>{this.state.submission_progress}</h4>
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
                            {(this.state.editing) ?
                                // In this state if a user has been selected for a package
                                <div>
                                    {/* This back button looks ugly, but idk how to fix it */}
                                    <Button onClick={() => this.handleBackButton()}>Back</Button>
                                    <AddPackageForm currently_editing = {this.state.currently_editing} handleAddPackage = {this.handleAddPackage}/>
                                </div>
                            :
                                (this.state.users.length) ? 
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
