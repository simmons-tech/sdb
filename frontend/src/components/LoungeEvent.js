import React, { useState } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import axios from "../axiosInstance";

function processApprover(user, goers) {
  if (goers.includes(user)) {
    return "*" + user;
  } else {
    return user;
  }
}

const LoungeEvent = (props) => {
  const [vote, setVote] = useState("");

  function submitVote(pk) {
    if (vote === "") return;
    axios
      .post(`/api/loungeevents/${pk}/vote/`, {
        approved: vote[0] === "1",
        going: vote[1] === "1",
      })
      .then(() => {
        props.setLoading(true);
      });
  }

  const event = props.event;
  const goers = event.goers.map((user) => user.username);
  const approvers = event.approvers.map((user) => user.username);
  const disapprovers = event.disapprovers.map((user) => user.username);

  let approvalDropdown = null;
  if (goers.includes(props.user.username)) {
    approvalDropdown = <span>approve and plan to attend this event</span>;
  } else if (approvers.includes(props.user.username)) {
    approvalDropdown = <span>approve but don't plan to attend this event</span>;
  } else if (disapprovers.includes(props.user.username)) {
    approvalDropdown = <span>don't approve of this event</span>;
  } else {
    approvalDropdown = (
      <InputGroup className="ml-1">
        <Input
          type="select"
          name="select"
          id="exampleSelect"
          onChange={(e) => {
            setVote(e.target.value);
          }}
        >
          <option value="">Please select an option</option>
          <option value="11">approve and plan to attend this event</option>
          <option value="10">
            approve but don't plan to attend this event
          </option>
          <option value="00">don't approve of this event</option>
        </Input>
        <InputGroupAddon addonType="append">
          <Button
            onClick={() => {
              submitVote(event.pk);
            }}
          >
            Submit
          </Button>
        </InputGroupAddon>
      </InputGroup>
    );
  }

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle>
          <Row>
            <Col>
              <h5>
                <b>Date:</b> {event.date}
              </h5>
            </Col>
            <Col>
              <h5>
                <b>Participants:</b>{" "}
                {event.cancelled ? "Cancelled" : event.participants}
              </h5>
            </Col>
            <Col>
              <h5>
                <b>Approvals:</b> {approvers.length}{" "}
                {approvers.length !== 0 ? (
                  <small>
                    (
                    {approvers
                      .map((user) => processApprover(user, goers))
                      .join(", ")}
                    )
                  </small>
                ) : null}
              </h5>
            </Col>
          </Row>
        </CardTitle>
        <hr />
        <CardText style={{ whiteSpace: "pre-line" }}>
          {event.description}
        </CardText>
        {props.user.lounge_pk === event.lounge_pk ? (
          <b style={{ display: "flex", alignItems: "center" }}>
            <span className="mr-1">I</span> {approvalDropdown}
          </b>
        ) : null}
      </CardBody>
      <CardFooter>
        <p>
          <b>Amount:</b> {event.cancelled ? "Cancelled" : `$${event.amount}`}
        </p>
        <p>
          <b>Created by:</b> {event.user_created.first_name}{" "}
          {event.user_created.last_name}
        </p>
        <p>
          <b>Submitted at:</b>{" "}
          {new Date(event.time_created).toLocaleString("en-US")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoungeEvent;
