import React, { Component } from "react";
import BasePage from '../BasePage';
import {Input, Col} from "reactstrap"
import { Formik, Form, Field } from 'formik';
import {CustomInputForm} from '../../components/CustomFormikInputs'
import { FormGroup, Label, Button } from "reactstrap"
import axios from '../../axiosInstance';


class ProfilePage extends Component {

  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    if (this.props.user) {
      axios
      .get(`/api/users/${this.props.user.pk}/get_profile/`)
      .then(res => {
        this.setState({
          loading: false,
          data: res.data
        })
      })
    }
  }

  onSubmit = (values) => {
    this.setState({text: "Submitting..."});
    axios
      .post(`/api/users/${this.props.user.pk}/update_profile/`, values)
      .then(res => {
        this.setState({text: "Saved",})
      })
  }

  render() {
    let data = this.state.data
    return (
      <BasePage loading={this.state.loading} header="" {... this.props} >
        { data &&
          <Formik
          initialValues={{
            homepage: data.homepage,
            cell_phone: data.cell_phone,
            home_city: data.home_city,
            state: data.state,
            country: data.country,
            quote: data.quote,
            favorite_category: data.favorite_category,
            favorite_item: data.favorite_item
          }}
          onSubmit={values => this.onSubmit(values)}
        >
          <Form className='p'>
            <FormGroup row>
              <Label for="title" sm={2}>Title</Label>
              <Col sm={10}>
                <Input disabled type="text" name="title" value={data.title} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="first_name" sm={2}>First Name</Label>
              <Col sm={10}>
                <Input disabled type="text" name="first_name" value={data.first_name} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="last_name" sm={2}>Last Name</Label>
              <Col sm={10}>
                <Input disabled type="text" name="last_name" value={data.last_name} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="room" sm={2}>Room</Label>
              <Col sm={10}>
                <Input disabled type="text" name="room" value={data.room ? data.room.number : undefined} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="year" sm={2}>Year</Label>
              <Col sm={10}>
                <Input disabled type="text" name="year" value={data.year} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="homepage" sm={2}>Homepage</Label>
              <Col sm={10}>
                <Field type="text" name="homepage" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="cell_phone" sm={2}>Cellphone</Label>
              <Col sm={10}>
                <Field type="text" name="cell_phone" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="home_city" sm={2}>Home city</Label>
              <Col sm={10}>
                <Field type="text" name="home_city" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="state" sm={2}>State</Label>
              <Col sm={10}>
                <Field type="text" name="state" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="country" sm={2}>Country</Label>
              <Col sm={10}>
                <Field type="text" name="country" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="quote" sm={2}>Quote</Label>
              <Col sm={10}>
                <Field type="text" name="quote" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="favorite_category" sm={2}>My favorite</Label>
              <Col sm={4}>
                <Field type="text" name="favorite_category" component={CustomInputForm} />
              </Col>
              <Label for="favorite_item" sm={"auto"} className="m-auto">is</Label>
              <Col sm={4}>
                <Field type="text" name="favorite_item" component={CustomInputForm} />
              </Col>
            </FormGroup>
            <Button type="submit">Save</Button> {  this.state.text}

          </Form>
        </Formik>
        }
      </BasePage>
    );
  }
}
export default ProfilePage;
