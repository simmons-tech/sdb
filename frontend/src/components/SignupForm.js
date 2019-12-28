import React from 'react';
import {
  Alert,
  Container,
  Row,
  Col,
  Input,
  FormFeedback,
  FormGroup,
  Label,
  Button
} from "reactstrap";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const customInputForm = ({ field, form: { touched, errors }, ...props }) => (
  <div>
    <Input
      invalid={!!(touched[field.name] && errors[field.name])}
      {...field}
      {...props} />
    {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
  </div>
);

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match!')
    .required("Required!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
});

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="6" sm="10" className="mx-auto p-0 text-white">
            {this.props.errors.map(error => (
              <Alert key={error} color="danger">
                {error}
              </Alert>
            ))}
            <Formik
              initialValues={{
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={values => this.props.handle_signup(values)}
            >
              <Form>
              <FormGroup>
                  <Label for="exampleUsername">Username</Label>
                  <Field name="username" type={'text'} component={customInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Field name="email" type={'email'} component={customInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Field name="password" type={'password'} component={customInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleConfirmPassword">Confirm Password</Label>
                  <Field name="confirmPassword" type={'password'} component={customInputForm} />
                </FormGroup>
                <Button type="submit">Sign up</Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignupForm;
