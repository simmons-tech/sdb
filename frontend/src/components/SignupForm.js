import React from 'react';
import {
  Alert,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Button
} from "reactstrap";
import { Formik, Form, Field } from 'formik';
import {CustomInputForm} from '../components/CustomFormikInputs';
import * as Yup from 'yup';



const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("Not a valid email!")
    .required("Required"),
  first_name: Yup.string()
    .required("Required"),
  last_name: Yup.string()
    .required("Required"),
  year: Yup.string(),
  room: Yup.string(),
  password: Yup.string()
    .required("Required")
});

class SignupForm extends React.Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="6" sm="10" className="mx-auto p-0">
            {this.props.errors.map((error, indx) => (
              <Alert key={indx} color="danger">
                <span>{error}</span>
              </Alert>
            ))}
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                first_name: '',
                last_name: '',
                year: '',
                room: '',
                resident_type: 'U',
                immortal: false,
                hidden: false
              }}
              validationSchema={SignupSchema}
              onSubmit={values => this.props.handle_signup(values)}
            >
              <Form>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Field name="username" type={'text'} id="username" component={CustomInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Field name="email" type={'text'} id="email" component={CustomInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Field name="password" type={'password'} id="password" component={CustomInputForm} />
                </FormGroup>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label for="first_name">First name</Label>
                      <Field type="text" name="first_name" id="first_name" component={CustomInputForm} />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="last_name">Last name</Label>
                      <Field type="text" name="last_name" id="last_name" component={CustomInputForm} />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="year">Year*</Label>
                  <Field name="year" type={'number'} id="year" component={CustomInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="room">Room*</Label>
                  <Field name="room" type={'text'} id="room" component={CustomInputForm} />
                </FormGroup>
                <FormGroup>
                  <Label for="resident_type">Resident Type</Label>
                  <Field type="select" name="resident_type" id="resident_type" component={CustomInputForm}>
                    <option value="AHOH">AHOH (Associate Head of House</option>
                    <option value="GRA">GRA (Graduate Resident Advisor)</option>
                    <option value="HOH">HOH (Head of House</option>
                    <option value="MGR">MGR (House Manager)</option>
                    <option value="OTHER">OTHER (Other)</option>
                    <option value="RLA">RLA (RLA)</option>
                    <option value="TEMP">TEMP (Temp)</option>
                    <option value="U">U (Undergraduate)</option>
                    <option value="VS">VS (Visiting Scholar)</option>
                  </Field>
                </FormGroup>
                <Row form>
                  <Col md="6">
                    <FormGroup check>
                      <Label check for="immortal">
                        <Field type="checkbox" name="immortal" id="immortal" component={CustomInputForm} />
                        Immortal (rarely true)</Label>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label check for="hidden">
                        <Field type="checkbox" name="hidden" id="hidden" component={CustomInputForm} /> 
                        Hidden (rarely true)
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
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
