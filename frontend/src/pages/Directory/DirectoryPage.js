import React, { Component, Fragment } from "react";
import BasePage from '../BasePage';
import UserTable from "../../components/StripedTable"
import { Formik, Form, Field } from 'formik';
import { CustomInputForm } from '../../components/CustomFormikInputs'
import { FormGroup, Label, Button, Col } from "reactstrap"
import LoadingSpinner from "../../components/LoadingSpinner"
import axios from '../../axiosInstance';


class ProfilePage extends Component {

  constructor(props) {
    super(props)
    this.state = { loading: false, rows: [], sections:[]}
  }

  componentDidMount() {
    axios
      .get('/api/sections/')
      .then(res => {
        this.setState({sections: res.data.map(item => item.name)})
      })
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
            section: '',
          }}
          onSubmit={values => this.onSubmit(values)}
        >
          <Form className='p'>
            <FormGroup row>
              <Label for="first_name" sm={2}>First Name</Label>
              <Col>
                <Field type="text" name="first_name" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="last_name" sm={2}>Last Name</Label>
              <Col>
                <Field type="text" name="last_name" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="title" sm={2}>Title</Label>
              <Col>
                <Field type="text" name="title" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="username" sm={2}>Username</Label>
              <Col>
                <Field type="text" name="username" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="room" sm={2}>Room</Label>
              <Col>
                <Field type="text" name="room" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="year" sm={2}>Year</Label>
              <Col>
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
