import React, { Component } from "react";
import { Col } from "reactstrap"
import { Formik, Form, Field } from 'formik';
import { CustomInputForm } from '../../../components/CustomFormikInputs'

import { FormGroup, Label, Button, Jumbotron } from "reactstrap"

import axios from '../../../axiosInstance';


class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {text: "", sections:[]}
    }


    componentDidMount() {
        axios
          .get('/api/sections/')
          .then(res => {
            this.setState({sections: res.data.map(item => item.name)})
          })
    }

    onSubmit = (values) => {
        this.setState({ text: "Fetching the DB..." });
        this.props.onQuery(values, () => { this.setState({ text: "Query Finished" }) });
    }

    render() {
        return (
            <Jumbotron>
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        title: '',
                        username: '',
                        room: '',
                        year: '',
                        section: '',
                    }}
                    onSubmit={values => this.onSubmit(values)}
                    >
                    <Form className='p'>
                        <FormGroup row>
                            <Label for="first_name" sm={2}>First Name</Label>
                            <Col sm={10}>
                                <Field type="text" name="first_name" component={CustomInputForm} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="last_name" sm={2}>Last Name</Label>
                            <Col sm={10}>
                                <Field type="text" name="last_name" component={CustomInputForm} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="title" sm={2}>Title</Label>
                            <Col sm={10}>
                                <Field type="text" name="title" component={CustomInputForm} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="username" sm={2}>Username</Label>
                            <Col sm={10}>
                                <Field type="text" name="username" component={CustomInputForm} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="room" sm={2}>Room</Label>
                            <Col sm={10}>
                                <Field type="text" name="room" component={CustomInputForm} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="year" sm={2}>Year</Label>
                            <Col sm={10}>
                                <Field type="text" name="year" component={CustomInputForm} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="section" sm={2}>Section</Label>
                            <Col>
                                <Field type="select" name="section" component={CustomInputForm}>
                                <option value="">[Any]</option>
                                {this.state.sections.map((section, index) => (
                                    <option key={index} value={section}>{section}</option>
                                ))}
                                </Field>
                            </Col>
                        </FormGroup>
                        <Button type="submit">Search</Button>
                        <div>{this.state.text}</div>
                    </Form>
                </Formik>
                
            </Jumbotron>
        );
    }
}

export default UserSearch;