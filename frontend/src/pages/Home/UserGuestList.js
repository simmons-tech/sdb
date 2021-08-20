import React, {Component} from 'react';
import BasePage from "../BasePage";
import GuestListEditor from "../../components/GuestListEditor";

class UserGuestList extends Component {
    constructor(props) {
        super(props);

        this.state = {loading: false};
    }
    render() {
        return (
            <BasePage loading={this.state.loading} header="Edit Guest List">
                <GuestListEditor user={this.props.user} />
            </BasePage>
        );
    }
}

export default UserGuestList;
