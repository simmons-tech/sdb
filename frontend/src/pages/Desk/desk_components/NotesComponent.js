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
                    <Toast key={index}>
                        <ToastHeader>
                            {note.user.username}
                        </ToastHeader>
                        <ToastBody>
                            {note.body}
                            <Button onClick={() => this.handleComplete(note.pk)}>Complete!</Button>
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