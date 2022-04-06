import React, { useEffect, useState } from "react";

import axios from "../../axiosInstance";
import LoungeEvent from "../../components/LoungeEvent";
import BasePage from "../BasePage";

const LoungeEvents = (props) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios.get("/api/loungeevents").then((res) => {
      setEvents(res.data.reverse());
      setLoading(false);
    });
  }, [loading]);

  return (
    <BasePage loading={loading}>
      {events != null && events.length !== 0 ? (
        events.map((event) => (
          <LoungeEvent
            event={event}
            user={props.user}
            key={event.pk}
            setLoading={setLoading}
          />
        ))
      ) : (
        <p>No events yet.</p>
      )}
    </BasePage>
  );
};

export default LoungeEvents;
