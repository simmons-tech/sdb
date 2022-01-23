import React, { Component } from "react";
import {Toast, ToastBody, ToastHeader, Button} from "reactstrap";
import axios from "../../../axiosInstance";



class NotesComponent extends Component {

    handleComplete(pk) {
        axios
            .post('api/desknotes/' + pk + '/complete/')
            .then(_ => {this.props.update_notes()})
            .catch(e => console.log(e));
    }


    render() {
        return (
            (this.props.notes.length) ?
                this.props.notes.map((note, index) =>
                    <Toast key={index} transition={true}>
                        <ToastHeader 
                            icon = {(note.user === this.props.user) ? "primary" : "secondary"}
                            toggle = {() => this.handleComplete(note.pk)}>
                            {note.user.username}
                        </ToastHeader>
                        <ToastBody>
                            {note.body}
                        </ToastBody>
                    </Toast>
                )
                : 
                <Toast>
                    <ToastBody>
                        There are no notes :)
                    </ToastBody>
                </Toast>
        );
    }
}

export default NotesComponent;