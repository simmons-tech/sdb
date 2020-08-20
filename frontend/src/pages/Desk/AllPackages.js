import React, { Component } from "react";
import BasePage from "../BasePage";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import UserPackages from "./desk_components/UserPackage";
import axios from "../../axiosInstance";
import { Jumbotron } from "reactstrap";

class AllPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false, 
            rows: [], 
            selected_user: false,
            current_user: {}
        };
    }

    // once a user is found, clicking on them should go to the user's pacakges page

    loadPackages = () => {

        axios
        .get("/api/packages/")
        .then(res => {
            this.setState({
                loading: false,
                rows: res.data.map(item =>
                    [
                        item.recipient.display_name,
                        item.recipient.username,
                        item.location,
                        item.quantity,
                        (item.perishable) ? "Yes" : "No",
                        item.log_time,
                        item.desk_worker.display_name
                    ]
                )
            });
        })
        .catch(e => console.log(e));
        
    }

    componentDidMount() {
        this.loadPackages();
    } 

    handleOnClick = (row) => {
        this.setState({
            current_user:{
                display_name: row[0],
                username: row[1]
            },
            selected_user: true,
        })
    }

    handleBackButton = () => {
        // used to return to this page after 
        this.setState({loading: true, selected_user: false});
        this.loadPackages();        
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="All Waiting Packages">
                {(this.state.selected_user) ? 
                    <UserPackages user = {this.state.current_user} back = {this.handleBackButton}/>
                :
                <Jumbotron>
                    {(this.state.rows.length) ?
                        <InteractiveUserTable 
                            rows = {this.state.rows}
                            headers = {
                                ["Recipient",
                                "Username",
                                "Bin",
                                "# Pkgs",
                                "Perishable?",
                                "Last Registration",
                                "Registered By"
                            ]}
                            handleOnClick = {this.handleOnClick}
                        />
                
                    :
                        <h4>No packages waiting to be picked up.</h4>
                    }
                    
                </Jumbotron>
                }
            </BasePage>
        );
    }
}

export default AllPackages;