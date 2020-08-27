import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Col, FormGroup, Label, Button } from "reactstrap";
import {Field, Form, Formik } from "formik";
import { CustomInputForm } from '../../components/CustomFormikInputs'
import UserTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

class AddDeskItem extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, desk_captain: false, text:"", categories: []};
    }


    componentDidMount() {
        this.setState({loading: true})
        axios
          .get('/api/deskitems/categories/')
          .then(res => {
            this.setState({
                loading: false,
                desk_captain: true,
                categories: ["[Select]", ...res.data.categories]
            })
          }).catch(promise => (
            this.setState({
                loading: false,
                desk_captain: false
            })
          ))
      }

    onSubmit = (values) => {

        console.log(values);
        if(values.category === "0"){
            this.setState({text: "Please select a category"});
            return;
        } 
        
        axios
            .post('/api/deskitems/',{
                quantity: values.quantity,
                item: values.name,
                location: values.location,
                category: values.category,
            })
            .then(res => {
                if(res.data.status === "UNAUTHORIZED"){
                    this.setState({
                        text: "You do not have permissions to add items",
                    })
                } else if(res.data.status === "created"){
                    this.setState({
                        text: "Desk item added",
                    })
                }
                
            })
            .catch(this.setState({text: "An error has occured."}))

    }

    render() {
        return (
            <BasePage loading={this.state.loading} header="Add Desk Item">
                <Jumbotron>
                    {(this.state.desk_captain)?
                        <Formik
                            initialValues = {{
                                name: "",
                                quantity: "",
                                location: "",
                                category: "0"
                            }}
                            onSubmit={(values, {resetForm}) => {
                                this.onSubmit(values);
                                resetForm({
                                    name: "",
                                    quantity: "",
                                    location: "",
                                    category: "0"
                                });
                            }}
                        >
                            <Form className='p'>
                                <FormGroup row>
                                    <Label for="name" sm={2}>Name</Label>
                                    <Col sm={10}>
                                        <Field type="text" name="name" component={CustomInputForm} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="quantity" sm={2}>Quantity</Label>
                                    <Col sm={10}>
                                        <Field type="number" name="quantity" component={CustomInputForm} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="location" sm={2}>Location</Label>
                                    <Col sm={10}>
                                        <Field type="text" name="location" component={CustomInputForm} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="category" sm={2}>Category</Label>
                                    <Col>
                                        <Field type="select" name="category" component={CustomInputForm}>
                                        {this.state.categories.map((section, index) => (
                                            <option key={index} value={index + ""}>{section}</option>
                                        ))}
                                        </Field>
                                    </Col>
                                </FormGroup>
                                
                                <Button type="submit">Add</Button>
                                <div>{this.state.text}</div>
                            </Form>
                        </Formik>
                    :
                    <div>
                        <h4>You are not authorized to access this page.</h4>
                        <h4>Please contact the desk captain or tech chair if this is a mistake</h4>
                    </div>
                    
                    }
                    
                </Jumbotron>
            </BasePage>
        );
    }
}

export default AddDeskItem;