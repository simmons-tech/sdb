import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import axios from "../../../axiosInstance";


class AddNotes extends Component {
    constructor(props) {
        super(props);
        this.state = { input: "" }
    }

    // Input bo for the notes section. Should refresh the react component to get notes again from the db


    handle_change = (e) => {
        this.setState({ input: e.target.value });
    }

    handle_enter = (e) => {
        if (e.key === 'Enter') {
            this.handle_button();
        }
    }

    handle_button = () => {
        if(this.state.input.trim() !== ""){
            axios
                .post('/api/desknotes/',
                    {
                        desk_worker: this.props.user,
                        content: this.state.input,
                    })
                .then(res => {
                    this.clear_input();
                    this.props.update_notes();
                });
        }
    };

    clear_input = () => {
        this.setState({ input: "" });
    }

    render() {
        return (
            <div>
                <InputGroup>
                    <Input
                        placeholder="Add Note"
                        onKeyPress={this.handle_enter}
                        onChange={this.handle_change}
                        value={this.state.input}
                    />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.handle_button}>Post</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default AddNotes;