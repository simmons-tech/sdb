import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  CustomInputForm,
  CustomDirectoryAutocomplete,
} from "../../components/CustomFormikInputs";
import * as Yup from "yup";
import BasePage from "../BasePage";
import { FormGroup, Label, Button, Alert } from "reactstrap";

import axios from "../../axiosInstance";

const CreateLoungeSchema = Yup.object().shape({
  id: Yup.string()
    .max(20, "Too long!")
    .matches(/[0-9a-z]+/)
    .required("Required"),
  name: Yup.string().max(255, "Too long!").required("Required"),
  first_contact: Yup.string().required("Required"),
  second_contact: Yup.string()
    .notOneOf(
      [Yup.ref("first_contact")],
      "First and second contacts should be different"
    )
    .required("Required"),
});

const CreateLounge = (props) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  function createLounge(values) {
    setLoading(true);
    axios
      .post("/api/lounges/", values)
      .then((res) => {
        setLoading(false);
        setAlert(res.data);
      })
      .catch((err) => {
        if (
          err.response?.data?.status != null &&
          err.response?.data?.message != null
        ) {
          setLoading(false);
          setAlert(err.response.data);
        }
      });
  }

  return (
    <BasePage loading={loading}>
      {alert != null ? (
        <Alert
          color={alert.status}
          isOpen={alert != null}
          toggle={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      ) : null}

      <Formik
        initialValues={{
          id: "",
          name: "",
          first_contact: "",
          second_contact: "",
        }}
        validationSchema={CreateLoungeSchema}
        onSubmit={(values) => createLounge(values)}
      >
        <Form>
          <FormGroup>
            <Label for="id">Lounge ID</Label>
            <Field
              name="id"
              type={"text"}
              id="id"
              component={CustomInputForm}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Lounge name</Label>
            <Field
              name="name"
              type={"text"}
              id="name"
              component={CustomInputForm}
            />
          </FormGroup>
          <FormGroup>
            <Label for="first_contact">First contact</Label>
            <Field
              name="first_contact"
              type={"username"}
              id="first_contact"
              component={CustomDirectoryAutocomplete}
            />
          </FormGroup>
          <FormGroup>
            <Label for="second_contact">Second contact</Label>
            <Field
              name="second_contact"
              type={"username"}
              id="second_contact"
              component={CustomDirectoryAutocomplete}
            />
          </FormGroup>

          <Button type="submit">Create lounge</Button>
        </Form>
      </Formik>
    </BasePage>
  );
};

export default CreateLounge;
