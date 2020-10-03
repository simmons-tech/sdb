import React, { Component } from "react";
import BasePage from "../BasePage";
import {Jumbotron, Row, Col, Button} from 'reactstrap';
import axios from "../../axiosInstance";
import UserSearch from "./desk_components/UserSearch";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";

class ItemReturn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false, 
            searched: false, 
            users: [], 
            loans:[], 
            pks:[],
            pk:false,
            current_user: "",
            current_item: "",
            confirm: false,
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
                searched_user: true,
                current_user: "",
                current_item: "",
                confirm: false

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
            this.setState({
                current_user : row[1] + " " + row[0],
                loans: res.data.map(loan => 
                    [
                        loan.item.item,
                        loan.num_checked_out,
                        new Date(loan.time_due).toLocaleDateString(
                            undefined, 
                            {
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric'
                            }) 
                    ]
                ),
                pks: res.data.map(loan => 
                    [
                        loan.pk
                    ]
                )
            })
        })
    }

    handleItemSelect = (row) => {
        let pk_index = this.state.loans.findIndex(e => e === row);

        this.setState({
            current_item: row[0],
            confirm: true,
            pk: this.state.pks[pk_index]
        })

    }

    handleReturn = () => {

        axios.post("/api/loans/" + this.state.pk + "/ret/",{})
            .then(res =>{
                this.setState({
                    loans:[], 
                    pks:[],
                    pk:false,
                    current_user: "",
                    confirm: false,
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
                                {(this.state.current_user.length) ? 
                                        <div>
                                            <h4>Select an Item to return</h4>
                                                <InteractiveUserTable
                                                    rows={this.state.loans}
                                                    headers={["Name", "Quantity", "Date Due"]}
                                                    handleOnClick = {this.handleItemSelect}
                                                />
                                            {(this.state.confirm) ? 
                                                <Button onClick = {this.handleReturn} color="primary">Return {this.state.current_item}</Button>
                                            :
                                                <div></div>
                                            }
                                        </div>
                                        
                                    :
                                        (this.state.users.length)?
                                            
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