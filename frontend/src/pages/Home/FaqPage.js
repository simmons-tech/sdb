import React, { Component } from "react";
import BasePage from '../BasePage';
import axios from "../../axiosInstance";

class FaqPage extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: true, data: {is_user: false}}
    }

    componentDidMount() {
        axios
            .get("/api/fame/")
            .then(res => {
                this.setState({ loading: false, data: res.data})
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
                <BasePage loading={this.state.loading} header="FAQ" {... this.props}>
                    pls ask questions i'm begging you
                </BasePage>
            )
    }
}

export default FaqPage;