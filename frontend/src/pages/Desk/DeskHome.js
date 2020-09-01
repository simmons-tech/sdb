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
        this.state = { loading: false, items: [], overdue:[], notes: []};
    }

    load_notes = () => {
        axios.get("/api/desknotes/").then(res => {
            this.setState({
                loading: false,
                notes: res.data.map(item => {
                    return {
                        user: item.desk_worker,
                        body: item.content,
                        pk: item.pk,
                    }
                }),
                notes_refresh: false,
            });
        });
    }

    load_items = () =>{
        // get overdue items
        // axios.get("/api/loans/overdue/").then(res => {
        //     console.log(res);
        //     this.setState({
        //         loading: false,
        //         overdue: res.data.map(item => 
        //             [
        //                 item.name,
        //                 item.resident,
        //                 item.time_due
        //             ]
        //         ),
        //     });
        // });

        // get all checked out items
        axios.get("/api/deskitems/out/").then(res => {
            res.data.map(item => {
                axios.get("/api/deskitems/" + item.pk + "/loans/").then(res2 => {
                    res2.data.map(val => {
                        this.setState({
                            items:[[
                                val.resident.display_name, 
                                val.item.item, 
                                val.num_checked_out, 
                                new Date(val.time_due).toLocaleDateString(undefined, 
                                    {year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric'})], 
                                ...this.state.items]
                        })
                    })
                })
            })

            this.setState({
                loading:false
            })
        })
    }

    async componentDidMount() {
        this.load_notes();
        this.load_items();
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
                            <h2>Notes</h2>
                            <AddNotes update_notes={this.load_notes} {... this.props} />
                            <p></p> 
                            <NotesComponent update_notes={this.load_notes} notes={this.state.notes} />
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Jumbotron>
                            {/* <h2>Overdue Items</h2>
                            <p></p>
                            {(this.state.overdue.length) ? 
                                <UserTable
                                    rows={this.state.overdue}
                                    headers={["Name", "Item","Qty Loaned", "Return Date"]}
                                />
                            :
                                <h4>There are no overdue items.</h4>
                            } */}
                            <h2>Checked Out Items</h2>
                            <p></p>
                            {(this.state.items.length) ? 
                                <UserTable
                                    rows={this.state.items}
                                    headers={["Name", "Item","Qty Loaned", "Return Date"]}
                                />
                            :
                                <h4>There are no items checked out.</h4>
                            }
                            
                        </Jumbotron>
                    </Col>
                </Row>
            </BasePage>
        );
    }
}

export default DeskHome;