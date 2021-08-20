import React, {Component} from "react";
import axios from '../axiosInstance';
import LoadingSpinner from "./LoadingSpinner";
import {Button, Table, Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWindowClose} from "@fortawesome/free-solid-svg-icons";

export default class GuestListEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            guests: [{first_name: 'Bob', last_name: 'Jones', kerb: 'bjones'}],
            added: [],
            removed: [],
            saved: false,
        };
    }

    reloadGuestList() {
        axios
            .post('/api/users/guest_list/', {username: this.props.user.username})
            .then(res => {
                this.setState({
                    loading: false,
                    guests: res.data.guests,
                });
            })
            .catch(console.log);
    }

    componentDidMount() { this.reloadGuestList() }

    onSave() {
        const data = { add: this.state.added, remove: this.state.removed };
        axios
            .post(`/api/users/${this.props.user.pk}/edit_guests/`, data)
            .then(res => this.reloadGuestList())
            .then(_ => {
                this.setState({
                    saved: true,
                    removed: [],
                    added: [],
                })
            })
            .catch(console.log)
    }

    onUpdateFirstName(e, index) {
        const guest = {...this.state.added[index], first_name: e.target.value};
        this.setState({
           added: [...this.state.added.slice(0, index), guest, ...this.state.added.slice(index + 1)],
        });
    }

    onUpdateLastName(e, index) {
        const guest = {...this.state.added[index], last_name: e.target.value};
        this.setState({
           added: [...this.state.added.slice(0, index), guest, ...this.state.added.slice(index + 1)],
        });
    }

    onUpdateKerb(e, index) {
        const guest = {...this.state.added[index], kerb: e.target.value};
        this.setState({
           added: [...this.state.added.slice(0, index), guest, ...this.state.added.slice(index + 1)],
        });
    }

    removeIndex(index, added=false) {
        if (added) {
            this.setState({
                added: [...this.state.added.slice(0, index), ...this.state.added.slice(index + 1)],
            });
            return null;
        }

        this.setState({
            removed: [...this.state.removed, this.state.guests[index]],
        });
    }

    addGuest() {
        this.setState({
            added: [...this.state.added, {
                first_name: '',
                last_name: '',
                kerb: '',
            }],
        });
    }

    render() {
        if (this.state.loading) {
            return <LoadingSpinner />;
        }

        return (
            <div>
                <Table className='p-3' striped hover responsive style={{backgroundColor: "white"}}>
                    <thead>
                        <tr>
                            <th/>
                            <th>First</th>
                            <th>Last</th>
                            <th>Kerberos</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* List all of the guests already in the system (excluding those removed) */}
                        {this.state.guests.map((guest, index) => {
                            if (this.state.removed.includes(guest)) {
                                return null;
                            }

                            return (
                                <tr key={index}>
                                    <th>
                                        <Button
                                            size="sm"
                                            onClick={() => this.removeIndex(index)}
                                            color="danger"
                                        >
                                            <FontAwesomeIcon
                                                icon={faWindowClose}
                                                size="sm"
                                                color="white"
                                            />
                                        </Button>
                                    </th>
                                    <th>{guest.first_name}</th>
                                    <th>{guest.last_name}</th>
                                    <th>{guest.kerb}</th>
                                </tr>
                            );
                        })}

                        {/* Add new guests */}
                        {this.state.added.map((guest, index) => {
                            return (
                                <tr key={index}>
                                    <th>
                                        <Button
                                            size="sm"
                                            onClick={() => this.removeIndex(index, true)}
                                            color="danger"
                                        >
                                            <FontAwesomeIcon
                                                icon={faWindowClose}
                                                size="sm"
                                                color="white"
                                            />
                                        </Button>
                                    </th>
                                    <th>
                                        <Input
                                            name="First Name"
                                            type="text"
                                            onChange={e => this.onUpdateFirstName(e, index)}
                                            value={guest.first_name}
                                            placeholder="First Name"
                                        />
                                    </th>
                                    <th>
                                        <Input
                                            name="Last Name"
                                            type="text"
                                            onChange={e => this.onUpdateLastName(e, index)}
                                            value={guest.last_name}
                                            placeholder="Last Name"
                                        />
                                    </th>
                                    <th>
                                        <Input
                                            name="Kerberos"
                                            type="text"
                                            onChange={e => this.onUpdateKerb(e, index)}
                                            value={guest.kerb}
                                            placeholder="kerb"
                                        />
                                    </th>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <div className="m-3">
                    <Button className="m-3" onClick={() => this.addGuest()} color="success">Add Guest</Button>
                    <Button className="m-3" onClick={() => this.onSave()} color="secondary">Save</Button>
                    {this.state.saved ? 'Saved!' : null}
                </div>
            </div>
        );
    }
};