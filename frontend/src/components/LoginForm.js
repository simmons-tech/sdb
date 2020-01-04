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

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required"),
  username: Yup.string()
    .required("Required")
});

class LoginForm extends React.Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="6" sm="10" className="mx-auto p-0 text-white">
            {this.props.errors.map((error, indx) => (
              <Alert key={indx} color="danger">
                {error}
              </Alert>
            ))}
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={values => this.props.handle_login(values)}
            >
              <Form>
                <FormGroup>
                  <Label for="username">Username or Email</Label>
                  <Field name="username" type={''} component={customInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Field name="password" type={'password'} component={customInputForm} />
                </FormGroup>
                <Button type="submit">Login</Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
