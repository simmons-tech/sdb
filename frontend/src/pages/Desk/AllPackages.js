import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import InteractiveUserTable from "./desk_components/InteractiveUserTable";
import axios from "../../axiosInstance";

class AllPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, rows: []};
    }

    // once a user is found, clicking on them should go to the user's pacakges page

    async componentDidMount() {
        // TODO connect all packages backend
        axios
            .get("/api/packages/")
            .then(res => {
                this.setState({
                    loading: false,
                    rows: res.data.map(item =>
                        [
                            item.recipient.display_name,
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

    handleOnClick = (row) => {
        let username = row.username;
        // TODO Query the username for packages. 
    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="All Waiting Packages">
                <InteractiveUserTable 
                    rows = {this.state.rows}
                    headers = {
                        ["Recipient",
                         "Bin",
                         "# Pkgs",
                         "Perishable?",
                         "Last Registration",
                         "Registered By"
                    ]}
                    handleOnClick = {this.handleOnClick}
                />
            </BasePage>
        );
    }
}

export default AllPackages;