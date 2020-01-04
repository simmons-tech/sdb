import React, { Component } from "react";
import BasePage from './BasePage';
import { CustomDirectoryAutocomplete } from '../components/CustomFormikInputs'
import axios from '../axiosInstance';
import { Formik, Form, Field } from 'formik';
import { FormGroup, Label, Button } from "reactstrap"
import saveToken from '../login';
import * as Yup from 'yup';


class ImpersonatePage extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  componentDidMount() {
    axios
      .get("/api/fame/")
      .then(res => {
        this.setState({ loading: false, user: res.data })
      })
      .catch(err => console.log(err));
  }

  onSubmit = (values) => {
    axios
      .post('/impersonate/', values)
      .then(res => saveToken(res.data, this.props.history))
  }

  render() {
    const Schema = Yup.object().shape({
      kerb: Yup.string()
        .required("Required")
    });

    return (
      <BasePage loading={this.state.loading} header="15 Seconds Of Fame" {... this.props} >
        <Formik
          initialValues={{
            kerb: '',
          }}
          validationSchema={Schema}
          onSubmit={values => this.onSubmit(values)}
        >
          <Form>
            <FormGroup>
              <Label for="kerb">Kerberos</Label>
              <Field name="kerb" type={'text'} id="kerb" component={CustomDirectoryAutocomplete} />
            </FormGroup>
            <Button type="submit">Impersonate</Button>
          </Form>
        </Formik>
      </BasePage>
    );
  }
}
export default ImpersonatePage;
