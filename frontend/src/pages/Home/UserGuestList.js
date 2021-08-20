import React, {Component} from 'react';
import BasePage from "../BasePage";
import GuestListEditor from "../../components/GuestListEditor";
import {Jumbotron} from "reactstrap";

class UserGuestList extends Component {
    constructor(props) {
        super(props);

        this.state = {loading: false};
    }
    render() {
        return (
            <BasePage loading={this.state.loading}>
                <Jumbotron>
                    <h4>Edit Guest List</h4>
                    <GuestListEditor user={this.props.user} />
                </Jumbotron>
            </BasePage>
        );
    }
}

export default UserGuestList;
