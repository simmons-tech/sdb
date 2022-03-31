import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { CustomInputForm } from "../../components/CustomFormikInputs";
import { FormGroup, Label, Button, Col, Row } from "reactstrap";

import BasePage from "../BasePage";
import StripedTable from "../../components/StripedTable";
import axios from "../../axiosInstance";

function toIsoString(date) {
  let pad = function (num) {
    var norm = Math.floor(Math.abs(num));
    return (norm < 10 ? "0" : "") + norm;
  };
  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes())
  );
}

const UserGuestListPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [renewalMode, setRenewalMode] = useState(undefined);
  const [renewalModeStatus, setRenewalModeStatus] = useState("");
  const [guestList, setGuestList] = useState([]);
  const [oneTimeEvents, setOneTimeEvents] = useState([]);

  useEffect(() => {
    // Get the renewal mode
    axios
      .get(`/api/users/${props.user.pk}/guest_list_renewal_mode/`)
      .then((res) => {
        setRenewalMode(res.data);
      });

    function guestListToTable(guestList) {
      return [
        ...guestList.map((guest) => [
          guest.last_name,
          guest.first_name,
          <Button
            type="button"
            className="btn-danger"
            onClick={() => {
              onGuestRemoval(guest);
            }}
          >
            Remove
          </Button>,
        ]),
        // Add a row to add a guest
        [
          <>
            <Label for="last-name" hidden={true}>
              Last name
            </Label>
            <Field
              type="text"
              maxLength="255"
              required
              name="lastName"
              component={CustomInputForm}
            />
          </>,
          <>
            <Label for="first-name" hidden={true}>
              First name
            </Label>
            <Field
              type="text"
              maxLength="255"
              required
              name="firstName"
              component={CustomInputForm}
            />
          </>,
          <Button type="submit">Add</Button>,
        ],
      ];
    }

    // Get the guests
    axios
      .get(`/api/users/guest_list?username=${props.user.username}`)
      .then((res) => {
        setGuestList(guestListToTable(res.data.guest_list));
        setOneTimeEvents(
          res.data.one_time_events.map((event) => {
            return {
              name: event.name,
              startTime: event.start_time,
              endTime: event.end_time,
              guestList: guestListToTable(event.guest_list),
              pk: event.pk,
            };
          })
        );
      });
    setLoading(false);
  }, [loading, props.user.pk]);

  function onRenewalModeSubmit(values) {
    setRenewalModeStatus("Updating...");
    axios
      .patch(`/api/users/${props.user.pk}/`, {
        guest_list_renewal_mode: values.renewalMode,
      })
      .then(() => {
        setRenewalModeStatus("Updated!");
        setRenewalMode(values.renewalMode);
        setLoading(true);
        // Remove the "Updated!" thing after 2 seconds
        setTimeout(() => setRenewalModeStatus(""), 2000);
      });
  }

  function onGuestRemoval(guest) {
    // TODO: Use a modal for confirmation?
    if (
      window.confirm(
        `Remove ${guest.first_name} ${guest.last_name} from your guest list?`
      )
    ) {
      axios.delete(`/api/guests/${guest.pk}/`).then(() => {
        setLoading(true);
      });
    }
  }

  function onEventDeletion(event) {
    // TODO: Use a modal for confirmation?
    if (window.confirm(`Remove this one-time event?`)) {
      axios.delete(`/api/onetimeevents/${event.pk}/`).then(() => {
        setLoading(true);
      });
    }
  }

  function onGuestListSubmit(values) {
    axios
      .post("/api/guests/", {
        is_one_time: false,
        last_name: values.lastName,
        first_name: values.firstName,
      })
      .then(() => {
        setLoading(true);
      });
  }

  function onEventGuestListSubmit(values, event) {
    axios
      .post("/api/guests/", {
        is_one_time: true,
        event_pk: event.pk,
        validity_start_time: event.startTime,
        validity_end_time: event.endTime,
        last_name: values.lastName,
        first_name: values.firstName,
      })
      .then(() => {
        setLoading(true);
      });
  }

  function onEventCreationSubmit(values) {
    let timeDelta = Date.parse(values.endTime) - Date.parse(values.startTime);
    if (timeDelta < 0) {
      window.alert(
        "Invalid event time range: the start time cannot be after the end time."
      );
    } else if (timeDelta > 86400000) {
      window.alert(
        "Invalid event time range: the event cannot be longer than 24 hours."
      );
    } else {
      axios
        .post("/api/onetimeevents/", {
          name: values.eventName,
          start_time: values.startTime,
          end_time: values.endTime,
        })
        .then(() => {
          setLoading(true);
        });
    }
  }

  return (
    <BasePage loading={loading}>
      <h2>Renewal Mode</h2>
      <Formik
        enableReinitialize
        initialValues={{ renewalMode }}
        onSubmit={(values) => onRenewalModeSubmit(values)}
      >
        <Form>
          <FormGroup>
            <Label className="mr-4">
              <Field
                type="radio"
                name="renewalMode"
                value="Monthly"
                className="mr-2"
              />
              Monthly
            </Label>
            <Label className="mr-4">
              <Field
                type="radio"
                name="renewalMode"
                value="End of Year"
                className="mr-2"
              />
              End of Year
            </Label>
            <Button type="submit">Update</Button>
            <span className="ml-2">{renewalModeStatus}</span>
          </FormGroup>
        </Form>
      </Formik>

      <h2>Guest List</h2>
      <p>
        This is your portion of the Simmons Hall electronic guest list. Your
        visitors do <u>not</u> have to be on this list in order to visit. Your
        entries here serve only as a convenience to you and to the desk workers.
        They can use this system to verify visitors without having to call you
        down to desk.
      </p>
      <p>
        To add a person to your guest list, type his or her full name as it
        would appear on an ID card, but with last name first (e.g. "Holl,
        Simon"). Then click <b>Add</b>.
      </p>
      <Formik
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={(values) => onGuestListSubmit(values)}
      >
        <Form>
          <StripedTable
            headers={["Last name", "First name", "Action"]}
            rows={guestList}
            hideRowCount={true}
          />
        </Form>
      </Formik>

      <h2>One-Time Guest List</h2>
      <p>
        Any Simmons resident can provide a single use guest list for a large
        event. This guest list can be created no more than one week in advance
        and can be valid for no longer than 24 hours.
      </p>
      {oneTimeEvents.map((event) => (
        <div key={event.name} className="card mb-3">
          <div className="card-body">
            <Row>
              <Col>
                <h3 className="card-title mb-0">{event.name}</h3>
                <h4 className="card-subtitle mb-3">
                  <sub>
                    {`${new Date(Date.parse(event.startTime)).toLocaleString(
                      "us",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )} to ${new Date(Date.parse(event.endTime)).toLocaleString(
                      "us",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}`}
                  </sub>
                </h4>
              </Col>
              <Col xs="auto">
                <Button
                  type="button"
                  className="btn-danger"
                  onClick={() => {
                    onEventDeletion(event);
                  }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
            <Formik
              initialValues={{ firstName: "", lastName: "" }}
              onSubmit={(values) => onEventGuestListSubmit(values, event)}
            >
              <Form>
                <StripedTable
                  headers={["Last name", "First name", "Action"]}
                  rows={event.guestList}
                  hideRowCount={true}
                />
              </Form>
            </Formik>
          </div>
        </div>
      ))}
      <div className="card mb-3">
        <div className="card-body">
          <h3>Add an event</h3>
          <Formik
            initialValues={{
              eventName: "",
              startTime: toIsoString(new Date()),
              endTime: toIsoString(new Date()),
            }}
            onSubmit={(values) => onEventCreationSubmit(values)}
          >
            <Form>
              <FormGroup row>
                <Col xs="12" md="12" lg="4">
                  <Label for="eventName">Event name</Label>
                  <Field
                    type="text"
                    maxLength="255"
                    required
                    name="eventName"
                    component={CustomInputForm}
                  />
                </Col>
                <Col xs="12" md="6" lg="4">
                  <Label for="startTime">Start time</Label>
                  <Field
                    type="datetime-local"
                    min={toIsoString(new Date())}
                    max={toIsoString(new Date(Date.now() + 604800000))}
                    required
                    name="startTime"
                    component={CustomInputForm}
                  />
                </Col>
                <Col xs="12" md="6" lg="4">
                  <Label for="endTime">End time</Label>
                  <Field
                    type="datetime-local"
                    min={toIsoString(new Date())}
                    max={toIsoString(new Date(Date.now() + 691200000))}
                    required
                    name="endTime"
                    component={CustomInputForm}
                  />
                </Col>
              </FormGroup>
              <Button type="submit">Create event</Button>
            </Form>
          </Formik>
        </div>
      </div>
    </BasePage>
  );
};

export default UserGuestListPage;
