import React, { useEffect, useState } from "react";

import axios from "../../axiosInstance";
import LoungeEvent from "../../components/LoungeEvent";
import BasePage from "../BasePage";

const MyLounge = (props) => {
  const [loading, setLoading] = useState(true);
  const [lounge, setLounge] = useState(null);

  useEffect(() => {
    axios.get(`/api/users/${props.user.pk}/my_lounge`).then((res) => {
      setLounge(res.data);
      setLoading(false);
    });
  }, [loading, props.user.pk]);

  return (
    <BasePage loading={loading}>
      {lounge !== "" && lounge != null ? (
        <>
          <h2>
            {lounge.name} <small>({lounge.pk})</small>
          </h2>
          <hr />

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
        </>
      ) : (
        <p>You're not part of a lounge yet!</p>
      )}
    </BasePage>
  );
};

export default MyLounge;
