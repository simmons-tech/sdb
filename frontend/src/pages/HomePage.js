import React, { Component } from "react";
import BasePage from './BasePage';
import {FormGroup, Label, Button} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import {CustomDirectoryAutocomplete} from '../components/CustomFormikInputs';
import * as Yup from 'yup';

class LandingPage extends Component {

  onSubmit = (values) => {
    console.log(values)
  }

  render() {
    const Schema = Yup.object().shape({
      kerb: Yup.string()
        .min(2, "Too short!")
        .required("Required"),
      kerb2: Yup.string()
        .min(2, "Too short!")
        .required("Required")
    });


    return (
      <BasePage header="Home" {... this.props} >
        <Formik
          initialValues={{
            kerb: '',
            kerb2: '',
          }}
          onSubmit={this.onSubmit}
          validationSchema={Schema}
        >
          <Form>
              <FormGroup>
                <Label for="kerb">Username or Email</Label>
                <Field name="kerb" id="kerb" component={CustomDirectoryAutocomplete} />
                {/* <DirectoryAutocomplete value={this.state.value} onChange={this.onChange}/> */}
              </FormGroup>
              <FormGroup>
                <Label for="kerb2">Username or Email</Label>
                <Field name="kerb2" id="kerb2" component={CustomDirectoryAutocomplete} />
                {/* <DirectoryAutocomplete value={this.state.value} onChange={this.onChange}/> */}
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
        </Formik>
      </BasePage>
    );
  }
}
export default LandingPage;
