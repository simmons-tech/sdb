import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

class AllPackages extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, rows: []};
    }

    // once a user is found, clicking on them should go to the user's pacakges page

    async componentDidMount() {
        // TODO connect all packages backend
        axios.get("/api/packages/").then(res => {
            this.setState({
                loading: false,
                rows: res.data.map(item =>
                    [
                        item.recipient,
                        item.location,
                        item.quantity,
                        item.perishable,
                        item.log_time,
                        item.desk_worker
                    ]
                )
            });
        });
    } 

    render() {
        return (
            <BasePage loading={this.state.loading} header="All Waiting Packages">
                <UserTable 
                    rows = {this.state.rows}
                    headers = {
                        ["Recipient",
                         "Bin",
                         "# Pkgs",
                         "Perishable?",
                         "Last Registrationn",
                         "Registered By"
                    ]}
                />
            </BasePage>
        );
    }
}

export default AllPackages;