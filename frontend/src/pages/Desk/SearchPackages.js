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

    //TODO once a user is found, clicking on it should bring them to a 
    //     number of packages the user has page

    onUserQuery = (values, callback) => {
        // TODO this is probably wrong with the backend, but fix later
        axios.get("/api/users/", values).then(res => {
            this.setState({
                loading: false,
                users: res.data.map(user =>
                    [
                        user.first_name,
                        user.last_name,
                        user.title,
                        user.username,
                        user.room,
                        user.year
                    ]
                )
            });
        });
        callback();
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Package Pickup">
                {this.state.searched ?
                    <Jumbotron>
                        <InteractiveUserTable
                            rows={this.state.users}
                            headers={["Last", "First", "Title", "Username", "Room", "Year"]}
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