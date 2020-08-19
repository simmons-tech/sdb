import React, { Component } from "react";
import { Col } from "reactstrap"
import { Formik, Form, Field } from 'formik';
import { CustomInputForm } from '../../../components/CustomFormikInputs'

import { FormGroup, Label, Button } from "reactstrap"


class AddPackageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "", 
            sections: [], 
            defaults: {
                bin:"", 
                packages: 1, 
                perishable: false
            }}
    }

    onSubmit = (values) => {
        if (values.bin.trim() === ""){
            this.setState({ text: "The bin field cannot be empty"});
            return;
        }
        if (values.packages < 1 || Math.floor(values.packages) !== values.packages){
            this.setState({ text: "The number of packages is invalid"});
            return;
        }
        
        console.log("in add form")
        console.log(values)
        this.props.handleAddPackage(values, () => { this.setState({ text: "Query Finished" }) });
    }

    render() {
        let user = this.props.currently_editing
        let name = (user.title.trim() === "") ? 
            user.first_name + " " + user.last_name :
            user.first_name + " \"" + user.title + "\" " + user.last_name
        return (
            <div>
                <h4>Packages for {name} </h4>
                <Formik
                    initialValues={{
                        bin: this.state.defaults.bin,
                        packages: this.state.defaults.packages,
                        perishable: this.state.defaults.perishable,
                    }}
                    onSubmit={(values, {resetForm}) => {
                        this.onSubmit(values);
                        resetForm({
                            bin: this.state.defaults.bin,
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
            </div>
        );
    }
}

export default AddPackageForm;