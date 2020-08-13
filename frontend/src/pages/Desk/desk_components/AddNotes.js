import React, { Component } from "react";
import { InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import axios from "../../../axiosInstance";
import saveToken from '../../../login';




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
        // TODO connect it to the backend
        // TODO make the message show up on after the post. This might be part of notes component
        // axios
        //     .post('/desk_notes/', this.state.input)
        //     .then(res => {
        //         saveToken(res.data, this.props.history);
        //     })
        // console.log(this.state.input);
        this.props.update_notes(); // tells dashboard to update the notes
        this.clear_input();
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
                        <Button onClick={this.handle_button} >Post</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default AddNotes;