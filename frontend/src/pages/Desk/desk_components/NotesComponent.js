import React, { Component } from "react";
import {Toast, ToastBody, ToastHeader} from "reactstrap";



class NotesComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            (this.props.notes.length) ?
                this.props.notes.map(note => 
                    <Toast>
                        <ToastHeader>
                            {note.user}
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