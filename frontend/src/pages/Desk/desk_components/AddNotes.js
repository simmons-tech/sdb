import React, {Component} from "react";
import {InputGroup, Input, InputGroupAddon, Button} from "reactstrap";
 



class AddNotes extends Component {
    constructor(props) {
        super(props);
    }

    // Input bo for the notes section. Should refresh the react component to get notes again from the db

    //TODO button press or enter to add the note

    // handle_login = (data) => {
    //     axios
    //       .post('/token_auth/', data)
    //       .then(res => {
    //         saveToken(res.data, this.props.history);
    //       })
    //       .catch((e) => {
    //         this.setState({
    //           errors: Object.values(e.response.data).reduce((a, element) => a.concat(element), [])
    //         });
    //       })
    //   };

    render() {
        return (
            <div>
                <InputGroup>
                    <Input />   
                    <InputGroupAddon addonType="append">
                        <Button>Post</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default AddNotes;