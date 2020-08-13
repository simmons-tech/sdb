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
        this.state = { loading: false, rows: [], notes: []};
    }

    // async componentDidMount() {
    //     axios.get("/api/packages/").then(res => {
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
    // } 

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
                            <AddNotes/>
                            <p></p> {/* used for the extra space. */}
                            <NotesComponent notes={this.state.notes}/>
                        </Jumbotron>                   
                    </Col>
                    <Col>
                        <Jumbotron>
                            Checked out items
                            <p></p>
                            <UserTable
                                rows={this.state.rows}
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