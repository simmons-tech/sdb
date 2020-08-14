import React, { Component } from "react";
import {Col} from "reactstrap"
import { Formik, Form, Field} from 'formik';
import {CustomInputForm} from '../../../components/CustomFormikInputs'

import { FormGroup, Label, Button, Jumbotron } from "reactstrap"

import axios from '../../../axiosInstance';


class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {test:""};
    }

    componentDidMount(){
      this.setState({data: {first_name:"",
      last_name:"",
      title:"",
      room:"",
      year:"",
      gra:"",
      lounge:""}
        
      })
    }

    onFinish = () =>{
      this.setState({text: "Query Finished"})
    }

    onSubmit = (values) => {
        this.setState({text: "Fetching the DB..."});
        this.props.onQuery(values, this.onFinish);

    }

    render() {
      let data = this.state.data;
        return (
          <Jumbotron>
            { data &&
              <Formik
              initialValues={{
                first_name: data.first_name,
                last_name: data.last_name,
                title: data.title,
                room: data.room,
                year: data.year,
                gra: data.gra,
                lounge: data.lounge
              }}
              onSubmit={values => this.onSubmit(values)}
                >
              <Form className='p'>
                <FormGroup row>
                  <Label for="first_name" sm={2}>First Name</Label>
                  <Col sm={10}>
                    <Field type="text" name="first_name" component={CustomInputForm}/>
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
                    <Field type="text" name="title" component={CustomInputForm}/>
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
                  <Label for="lounge" sm={2}>Lounge</Label>
                  <Col sm={10}>
                    <Field type="text" name="lounge" component={CustomInputForm} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="gra" sm={2}>GRA</Label>
                  <Col sm={10}>
                    <Field type="text" name="gra" component={CustomInputForm} />
                  </Col>
                </FormGroup>
                <Button type="submit">Search</Button>
                <div>{this.state.text}</div>
              </Form>
            </Formik>
            }
          </Jumbotron>
        );
      }
}

export default UserSearch;