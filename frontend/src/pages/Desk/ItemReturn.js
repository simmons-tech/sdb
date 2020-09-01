import React, { Component } from "react";
import BasePage from "../BasePage";
import {Jumbotron, Row, Col} from 'reactstrap';
import axios from "../../axiosInstance";
import UserSearch from "./desk_components/UserSearch";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";

class ItemReturn extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, searched: false, users: [], loans:[]};
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
                searched_user: true,
                selected_user: false,
            });
        });
        callback();
    }

    handleUserSelect = (row) => {
        // gets all loans for a user
        axios.post("/api/loans/user_loans/",{
            username: row[3]
        })
        .then(res => {
            console.log(res)
            this.setState({
                loans: res.data.map(loan => 
                    [

                    ]
                )
            })
        })
    }


    render() {
        return (
            <BasePage loading={this.state.loading} header="Item Return">
                <Row>
                    <Col>
                        <UserSearch onQuery={this.onUserQuery} {...this.props} />
                    </Col>
                        {(this.state.searched_user) ? 
                            <Col>
                                <Jumbotron>
                                    {(this.state.users.length)?
                                            <div>
                                                <h4>Select a User</h4>
                                                <InteractiveUserTable
                                                    rows={this.state.users}
                                                    headers={["Last", "First", "Title", "Username", "Room", "Year"]}
                                                    handleOnClick = {this.handleUserSelect}
                                                />
                                            </div>   
                                        :
                                           <h4>There are no users that match your query</h4> 
                                    }
                                </Jumbotron>
                            </Col>
                        :
                            <div></div>
                        }

                </Row>
                
                
                
                
            </BasePage>
        );
    }
}

export default ItemReturn;