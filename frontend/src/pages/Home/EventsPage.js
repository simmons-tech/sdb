import React, { useState } from "react";
import BasePage from "../BasePage";

const EventsPage = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <BasePage loading={loading}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          title="Simmons event calendar"
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FNew_York&amp;src=OGlzcnFzYzlmbmt1aWFuZTVxZDFjbGowaG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23A79B8E"
          scrolling="auto"
          width="800"
          height="600"
          frameBorder="0"
        ></iframe>
      </div>
    </BasePage>
  );
};

export default EventsPage;
