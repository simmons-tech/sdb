import React, { Component } from 'react';
import axios from '../../axiosInstance';

import BasePage from "../BasePage";
import StripedTable from "../../components/StripedTable";

class UserPackagePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            packages: [],
        }
    }

    async componentDidMount() {
        if (this.props.user) {
            axios
                .get(`api/users/${this.props.user.pk}/packages/`)
                .then(res => {
                    this.setState({
                        loading: false,
                        packages: res.data.map(data => (
                            // Load the relevant package data in the order it will display on the table
                            [
                                data.log_time,
                                data.quantity,
                                (data.perishable) ? "Yes" : "No",
                                data.picked_up,
                            ]
                        )),
                    })
                });
        }
    }

    render() {
        return (
            <BasePage header="Packages" loading={this.state.loading} {... this.props} >
                <StripedTable
                    headers={['Time Logged', 'Quantity', 'Perishable', 'Picked Up']}
                    rows={this.state.packages}
                />
            </BasePage>
        );
    }
}

export default UserPackagePage;