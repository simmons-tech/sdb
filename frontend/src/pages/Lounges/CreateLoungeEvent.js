import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  CustomInputForm,
  CustomCurrencyInputForm,
} from "../../components/CustomFormikInputs";
import * as Yup from "yup";
import BasePage from "../BasePage";
import { FormGroup, Label, Button, Alert } from "reactstrap";

import axios from "../../axiosInstance";

const CreateEventSchema = Yup.object().shape({
  date: Yup.date().required("Required"),
  description: Yup.string().required("Required"),
  amount: Yup.string()
    .required("Required")
    .matches(/^\d*(\.\d{0,2})?$/, "Invalid amount requested"),
});

const CreateLoungeEvent = (props) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  function createEvent(values) {
    setLoading(true);
    axios
      .post("/api/loungeevents/", values)
      .then((res) => {
        // Redirect to the lounge homepage
        window.location.replace("/lounges/mylounge");
      })
      .catch((err) => {
        // TODO: Show server-side error on the form?
        setAlert({
          status: "danger",
          message: "Could not create lounge event",
        });
      });
  }

  // The user must be part of a lounge to create a lounge event
  if (props.user.lounge_pk != null) {
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
            date: "",
            description: "",
            amount: "",
          }}
          validationSchema={CreateEventSchema}
          onSubmit={(values) => createEvent(values)}
        >
          <Form>
            <FormGroup>
              <Label for="date">Event date</Label>
              <Field
                name="date"
                type={"date"}
                id="date"
                component={CustomInputForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Event description</Label>
              <Field
                name="description"
                type={"text"}
                id="description"
                component={CustomInputForm}
              />
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount requested</Label>
              <Field
                name="amount"
                id="amount"
                component={CustomCurrencyInputForm}
              />
            </FormGroup>

            <Button type="submit">Create event</Button>
          </Form>
        </Formik>
      </BasePage>
    );
  } else {
    return (
      <BasePage loading={false}>
        <p>You're not part of a lounge yet!</p>
      </BasePage>
    );
  }
};

export default CreateLoungeEvent;
