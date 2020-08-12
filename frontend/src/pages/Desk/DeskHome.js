import React, { Component } from "react";
import BasePage from "../BasePage";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

class DeskHome extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, rows: [] };
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
        return(
            <BasePage loading={this.state.loading} header="Desk Home">
                {/*<UserTable*/}
                {/*    rows={this.state.rows}*/}
                {/*    headers={["Location", "Recipient"]}*/}
                {/*/>*/}
                hello
            </BasePage>
        );
    }
}

export default DeskHome;