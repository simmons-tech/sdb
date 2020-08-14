import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import UserTable from "../../components/StripedTable";
import NotesComponent from "./desk_components/NotesComponent";
import AddNotes from "./desk_components/AddNotes";
import axios from "../../axiosInstance";

class DeskHome extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, items: [], notes: [], notes_refresh: false };
    }

    load_notes = () => {
        // polls the server to update the new notes
        // do a request here.
        axios.get("/api/desknotes/").then(res => {
            this.setState({
                loading: false,
                notes: res.data.map(item => {
                    return {
                        user: item.desk_worker,
                        body: item.content
                    }
                }),
                notes_refresh: false,
            });
        });
    }

    load_items = () =>{
        // polls the server for the status of checked out items
        // do a request here. 
        //     axios.get("/api/desk_items/").then(res => {
        //         this.setState({
        //             loading: false,
        //             rows: res.data.map(item =>
        //                 [
        //                     item.location,
        //                     item.recipient
        //                 ]
        //             )
        //         });
        //     });
    }

    update_notes = () => {
        this.setState({ notes_refresh: true })
    }


    async componentDidMount() {
        this.load_notes();
    }

    componentWillUpdate() {
        if (this.state.notes_refresh) {
            this.load_notes();
        }
    }


    render() {
        return (
            <BasePage loading={this.state.loading} header="Dashboard">

                <Jumbotron>
                    Test Dashboard
                </Jumbotron>

                <Row>
                    <Col xs="4">
                        <Jumbotron>
                            Notes
                            <AddNotes update_notes={this.update_notes} {... this.props} />
                            <p></p> {/* used for the extra space. */}
                            <NotesComponent notes={this.state.notes} />
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Jumbotron>
                            Checked out items
                            <p></p>
                            <UserTable
                                rows={this.state.items}
                                headers={["Name", "Item", "Return Date"]}
                            />
                        </Jumbotron>
                    </Col>
                </Row>
            </BasePage>
        );
    }
}

export default DeskHome;