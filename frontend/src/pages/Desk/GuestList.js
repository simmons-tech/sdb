import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";
import UserSearch from "./desk_components/UserSearch";

class DeskGuestList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false, 
            searched: false, 
            selected_user: false,
            users: [], 
            //TODO Change this guest to query the db on click
            guests: [["first", "last","kerb"]]};
    }

    // async componentDidMount() {
    //     axios.get("/api/packages/").then(res => {
    //         this.setState({
    //             loading: false,
    //             rows: res.data.map(item =>
    //                 [
    //                     item.location,
    //                     item.recipient
    //                 ]
    //             )
    //         });
    //     });
    // } 

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
        axios
            .post('/api/users/guest_list/', {username: row[3]})
            .then(res => {
                this.setState({
                    current_user:{
                        display_name: row[1] + " " + row[0],
                        username: row[3],
                    },
                    selected_user: true,
                    guests: res.data.guests.map(guest => [guest.first_name, guest.last_name, guest.kerb]),
                })
            })
            .catch(err => console.log(err));
    }

    handleBackButton = () => {
        // used to return to this page after 
        this.setState({selected_user: false});
    }


    render() {
        return (
            <BasePage loading={this.state.loading} header="Search Guest List">
                {this.state.searched ?
                        (this.state.selected_user) ? 
                            <Jumbotron>
                                <h3> 
                                    Guest List for {this.state.current_user.display_name}
                                </h3>
                                <UserTable 
                                    rows={this.state.guests} 
                                    headers={["Last", "First", "Username"]}
                                    handleOnClick = {() => {}}
                                />
                            </Jumbotron>
                            
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
                <Jumbotron>
                    <h3>Search for a User</h3>
                    <UserSearch onQuery={this.onUserQuery} {...this.props}  noWrapper={true}/>
                </Jumbotron>
            </BasePage>
        );
    }
}

export default DeskGuestList;