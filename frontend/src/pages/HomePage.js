import React, { Component } from "react";
import BasePage from './BasePage';
import {FormGroup, Label, Button} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import {CustomDirectoryAutocomplete} from '../components/CustomFormikInputs';

class LandingPage extends Component {

  onSubmit = (values) => {
    console.log(values)
  }

  render() {
    return (
      <BasePage header="Home" {... this.props} >
        <Formik
          initialValues={{
            kerb: ''
          }}
          onSubmit={this.onSubmit}
        >
          <Form>
              <FormGroup>
                <Label for="kerb">Username or Email</Label>
                <Field name="kerb" id="kerb" component={CustomDirectoryAutocomplete} />
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
