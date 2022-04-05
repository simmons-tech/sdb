import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  FormGroup,
  Label,
  CardSubtitle,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { CustomInputForm } from "../../components/CustomFormikInputs";
import axios from "../../axiosInstance";
import BasePage from "../BasePage";

const LoungeAnnouncements = (props) => {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("/api/loungeannouncements").then((res) => {
      // Display latest announcements first
      setAnnouncements(res.data.reverse());
      setLoading(false);
    });
  }, [loading]);

  function onSubmit(values) {
    axios
      .post("/api/loungeannouncements/", {
        ...values,
      })
      .then(() => {
        setLoading(true);
      });
  }

  function deleteAnnouncement(pk) {
    axios.delete(`/api/loungeannouncements/${pk}`).then(() => {
      setLoading(true);
    });
  }

  const Schema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string(),
  });

  return (
    <BasePage loading={loading}>
      {props.isSocialChair ? (
        <div className="mb-3">
          <h3>New announcement</h3>
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={Schema}
            onSubmit={(values) => onSubmit(values)}
          >
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Field
                  name="title"
                  type={"text"}
                  id="title"
                  component={CustomInputForm}
                />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Field
                  name="description"
                  type={"textarea"}
                  id="description"
                  component={CustomInputForm}
                />
              </FormGroup>
              <Button type="submit">Post announcement</Button>
            </Form>
          </Formik>
          <hr />
        </div>
      ) : null}
      {announcements.map((announcement) => (
        <Card key={announcement.pk} className="mb-3">
          <CardBody>
            <CardTitle
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h2>{announcement.title}</h2>
              {props.isSocialChair ? (
                <Button
                  color="danger"
                  onClick={() => deleteAnnouncement(announcement.pk)}
                >
                  Delete
                </Button>
              ) : null}
            </CardTitle>
            <CardSubtitle>
              Posted{" "}
              {new Date(announcement.time_posted).toLocaleString("en-US")}
            </CardSubtitle>
            <hr />
            <CardText style={{ whiteSpace: "pre-line" }}>
              {announcement.description}
            </CardText>
          </CardBody>
        </Card>
      ))}
      {announcements.length === 0 ? <p>No announcements yet!</p> : null}
    </BasePage>
  );
};

export default LoungeAnnouncements;
