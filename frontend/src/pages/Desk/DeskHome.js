import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import UserTable from "../../components/StripedTable";
import NotesComponent from "./NotesComponent";
import AddNotes from "./AddNotes";
import axios from "../../axiosInstance";

class DeskHome extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, rows: [], notes: [], announcements: [] };
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
                {/* <UserTable
                   rows={this.state.rows}
                   headers={["Location", "Recipient"]}
                /> */}
                <Jumbotron>
                    Test Dashboard
                </Jumbotron>

                <Row>
                    <Col>
                        <Jumbotron>
                            Notes
                            <AddNotes/>
                            <p></p> {/* used for the extra space. could find a better way to do this. */}
                            <NotesComponent notes={this.state.notes}/>
                        </Jumbotron>                   
                    </Col>
                    <Col>
                        <Jumbotron>
                            Something
                        </Jumbotron> 
                    </Col>
                    <Col>
                        <Jumbotron>
                            Something Else
                        </Jumbotron> 
                    </Col>
                </Row>
            </BasePage>
        );
    }
}

export default DeskHome;