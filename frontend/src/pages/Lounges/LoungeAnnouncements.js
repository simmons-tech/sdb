import React, { useEffect, useState } from "react";
import { Jumbotron } from "reactstrap";

import axios from "../../axiosInstance";
import BasePage from "../BasePage";

const LoungeAnnouncements = (props) => {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios.get("/api/loungeannouncements").then((res) => {
      setAnnouncements(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <BasePage loading={loading}>
      <p>TODO: Something that lets social chairs post stuff</p>
      {announcements.map((announcement) => (
        <Jumbotron>
          <h2>{announcement.title}</h2>
          {announcement.description}
        </Jumbotron>
      ))}
      {announcements.length === 0 ? <p>No announcements yet!</p> : null}
    </BasePage>
  );
};

export default LoungeAnnouncements;
