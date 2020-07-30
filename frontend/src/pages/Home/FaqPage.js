import React, { Component } from "react";
import BasePage from '../BasePage';

class FaqPage extends Component {

    constructor(props) {
        super(props);
        this.state = {loading: false}
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