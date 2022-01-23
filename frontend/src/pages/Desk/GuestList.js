import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

class DeskGuestList extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, rows: []};
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

    render() {
        return (
            <BasePage loading={this.state.loading} header="Search Guest List">
                Under Construction
            </BasePage>
        );
    }
}

export default DeskGuestList;