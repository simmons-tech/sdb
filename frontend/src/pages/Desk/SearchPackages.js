import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserSearch from "./desk_components/UserSearch";
import axios from "../../axiosInstance";

class SearchPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, searched: false, users: [], packages: [] };
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

    handleOnClick = (row) => {
        let username = row[3];
        // TODO Bring to the packaege page of a user
        
        console.log(username);
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Package Pickup">
                {this.state.searched ?
                    <Jumbotron>
                        <InteractiveUserTable
                            rows={this.state.users}
                            headers={["Last", "First", "Title", "Username", "Room", "Year"]}
                            handleOnClick = {this.handleOnClick}
                        />
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