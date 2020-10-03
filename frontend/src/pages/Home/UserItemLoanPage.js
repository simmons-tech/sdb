import React, { Component } from 'react';
import axios from '../../axiosInstance';

import BasePage from "../BasePage";
import StripedTable from "../../components/StripedTable";

class UserItemLoanPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loans: [],
        };
    }

    async componentDidMount() {
        if (this.props.user) {
            axios
                .get(`api/users/${this.props.user.pk}/loaned_items/`)
                .then(res => {
                    this.setState({
                        loading: false,
                        loans: res.data.map(data => (
                            [
                                data.item.item,
                                new Date(data.time_out).toString(),
                                new Date(data.time_due).toString(),
                                data.num_checked_out,
                            ]
                        )),
                    });
                })
                .catch(e => console.log(e));
        }
    }

    render() {
        return (
            <BasePage header='Item Loans' loading={this.state.loading} {... this.props} >
                <StripedTable
                    headers={['Item Checked Out', 'Time Checked Out', 'Time Due', 'Number Checked Out']}
                    rows={this.state.loans}
                />
            </BasePage>
        );
    }
}

export default UserItemLoanPage;
