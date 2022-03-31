import React from "react";
import { Jumbotron } from "reactstrap";

function processApprover(user, goers) {
  if (goers.includes(user)) {
    return "*" + user;
  } else {
    return user;
  }
}

const LoungeEvent = (props) => {
  const event = props.event;
  event.goers = event.goers.map((user) => user.username);

  return (
    <Jumbotron>
      <h2>{event.name}</h2>
      <h3>
        <b>Date:</b> {event.date}; <b>Participants:</b>{" "}
        {event.cancelled ? "Cancelled" : event.participants}; <b>Approvals:</b>{" "}
        {event.approvers.length}{" "}
        <small>
          (
          {event.approvers
            .map((user) => processApprover(user.username, event.goers))
            .join(", ")}
          )
        </small>
      </h3>
      <p>{event.description}</p>
      <p>
        <b>Amount:</b> {event.cancelled ? "Cancelled" : `$${event.amount}`}
      </p>
      <p>
        <b>Created by:</b> {event.user_created.first_name}{" "}
        {event.user_created.last_name}
      </p>
      <p>
        <b>Submitted on:</b> {event.time_created}
      </p>
    </Jumbotron>
  );
};

export default LoungeEvent;
