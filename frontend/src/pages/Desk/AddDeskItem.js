import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

class AddDeskItem extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, item_added: ""};
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

    onSubmit = (values) => {

    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Add Desk Item">

                <Jumbotron>
                    <Formik
                        onSubmit={(values, {resetForm}) => {
                            this.onSubmit(values);
                            resetForm({
                                name: this.state.defaults.bin,
                                packages: this.state.defaults.packages,
                                perishable: this.state.defaults.perishable
                            });
                        }}
                        >
                        <Form className='p'>
                            <FormGroup row>
                                <Label for="bin" sm={2}>Bin</Label>
                                <Col sm={10}>
                                    <Field type="text" name="bin" component={CustomInputForm} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="packages" sm={2}>Packages</Label>
                                <Col sm={10}>
                                    <Field type="number" name="packages" component={CustomInputForm} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="perishable" sm={2}>Perishable</Label>
                                <Col>
                                    <Field type="select" name="perishable" component={CustomInputForm}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                    </Field>
                                </Col>
                            </FormGroup>
                            
                            <Button type="submit">Add</Button>
                            <div>{this.state.text}</div>
                        </Form>
                    </Formik>
                </Jumbotron>
            </BasePage>
        );
    }
}

export default AddDeskItem;