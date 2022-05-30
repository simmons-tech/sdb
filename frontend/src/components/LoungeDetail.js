import React, { useEffect, useState } from "react";

import axios from "../axiosInstance";
import LoungeEvent from "./LoungeEvent";
import BasePage from "../pages/BasePage";

const LoungeDetail = (props) => {
  const [loading, setLoading] = useState(true);
  const [lounge, setLounge] = useState({
    name: null,
    pk: null,
    members: [],
    events: [],
    budget_allocated: null,
    budget_remaining: null,
  });

  useEffect(() => {
    axios.get(`/api/lounges/${props.lounge_pk}`).then((res) => {
      res.data.events.reverse();
      setLounge(res.data);
      setLoading(false);
    });
  }, [loading, props.lounge_pk]);

  return (
    <BasePage loading={loading}>
      <h2>
        {lounge.name} <small>({lounge.pk})</small>
      </h2>
      <hr />

      <h3>Members</h3>
      <ul>
        {lounge.members.map((member) => (
          <li key={member.username}>
            {member.first_name} {member.last_name} ({member.username})
          </li>
        ))}
      </ul>

      <h3>Finances</h3>
      <p>
        <b>Budget allocated:</b> ${lounge.budget_allocated}
      </p>
      <p>
        <b>Budget remaining:</b> ${lounge.budget_remaining}
      </p>

      <h3>Events</h3>
      {lounge.events.map((event) => (
        <LoungeEvent
          event={event}
          user={props.user}
          key={event.pk}
          setLoading={setLoading}
        />
      ))}
      {lounge.events.length === 0 ? <p>No events yet.</p> : null}
    </BasePage>
  );
};

export default LoungeDetail;
