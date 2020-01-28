import React, { Component, Fragment } from "react";
import BasePage from '../BasePage';
import UserTable from "../../components/UserTable"
import { Formik, Form, Field } from 'formik';
import { CustomInputForm } from '../../components/CustomFormikInputs'
import { FormGroup, Label, Button } from "reactstrap"
import LoadingSpinner from "../../components/LoadingSpinner"
import axios from '../../axiosInstance';


class ProfilePage extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: false, rows: []}
  }

  onSubmit = (values) => {
    this.setState({ loading: true, rows: [] });
    axios
      .get(`/api/users/advanced_search/`, {params: values})
      .then(res => {
        this.setState({ loading: false, rows: res.data.map(item => 
          [
            item.last_name,
            item.first_name,
            item.title,
            item.username,
            item.room.number,
            item.year,
            <a href={"mailto:" + item.email}>{item.email}</a>
          ]) })
      })
  }

  // TODO: lounge support
  // TODO: GRA section support

  render() {
    let rows = this.state.rows
    return (
      <BasePage header="" {... this.props} >
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            title: '',
            username: '',
            room: '',
            year: '',
          }}
          onSubmit={values => this.onSubmit(values)}
        >
          <Form className='p'>
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Field type="text" name="first_name" component={CustomInputForm} />
            </FormGroup>
            <FormGroup >
              <Label for="last_name">Last Name</Label>
              <Field type="text" name="last_name" component={CustomInputForm} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Field type="text" name="title" component={CustomInputForm} />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Field type="text" name="username" component={CustomInputForm} />
            </FormGroup>
            <FormGroup>
              <Label for="room">Room</Label>
              <Field type="text" name="room" component={CustomInputForm} />
            </FormGroup>
            <FormGroup>
              <Label for="year">Year</Label>
              <Field type="text" name="year" component={CustomInputForm} />
            </FormGroup>
            <Button type="submit">Search</Button>
          </Form>
        </Formik>
        { this.state.loading && <LoadingSpinner color="black" />}
        { rows.length > 0 &&
          <Fragment>
            <br />
            <UserTable
              rows={rows}
              headers={['Last Name', 'First Name', 'Title', 'Username', 'Room', 'Year', 'Email']}
            />
          </Fragment>
        }
      </BasePage>
    );
  }
}
export default ProfilePage;
