import React, { Component } from "react";
import BasePage from '../BasePage';
import { CustomDirectoryAutocomplete } from '../../components/CustomFormikInputs'
import axios from '../../axiosInstance';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Label, Button } from "reactstrap"
import { saveJwtToken } from '../../login';
import * as Yup from 'yup';


class ImpersonatePage extends Component {

  onSubmit = (values) => {
    axios
      .post('/impersonate/', values)
      .then(res => saveJwtToken(res.data, this.props.history))
  }

  render() {
    const Schema = Yup.object().shape({
      username: Yup.string()
        .required("Required")
    });

    return (
      <BasePage {... this.props} >
        <Formik
          initialValues={{
            username: '',
          }}
          validationSchema={Schema}
          onSubmit={values => this.onSubmit(values)}
        >
          <Form>
            <FormGroup>
              <Label for="username">Username</Label>
              <Field name="username" type={'username'} id="username" component={CustomDirectoryAutocomplete} />
            </FormGroup>
            <Button type="submit">Impersonate</Button>
          </Form>
        </Formik>
      </BasePage>
    );
  }
}
export default ImpersonatePage;
