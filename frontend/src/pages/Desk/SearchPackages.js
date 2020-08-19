import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserSearch from "./desk_components/UserSearch";
import axios from "../../axiosInstance";
import UserPackages from "./desk_components/UserPackage";

class SearchPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false, 
            searched: false, 
            selected_user: false,
            users: [], 
            packages: [],
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
                searched: true,
                selected_user: false,
            });
        });
        callback();
    }

    handleOnClick = (row) => {
        console.log(row)
        this.setState({
            current_user:{
                display_name: row[1] + " " + row[0],
                username: row[3]
            },
            selected_user: true,
        })
    }


    handleBackButton = () => {
        // used to return to this page after 
        this.setState({selected_user: false});
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Package Pickup">
                {this.state.searched ?
                        (this.state.selected_user) ? 
                            <UserPackages user = {this.state.current_user} back = {this.handleBackButton}/>
                        :
                        <Jumbotron>
                            <div>
                                <h4>Select a User</h4>
                                <InteractiveUserTable
                                    rows={this.state.users}
                                    headers={["Last", "First", "Title", "Username", "Room", "Year"]}
                                    handleOnClick = {this.handleOnClick}
                                />
                            </div>
                        </Jumbotron>
                    :
                    <div></div>
                }
                <UserSearch onQuery={this.onUserQuery} {...this.props} />
            </BasePage>
        );
    }
}

export default SearchPackages;