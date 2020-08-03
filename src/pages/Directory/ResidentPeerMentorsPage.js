import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (<p>TODO: add description here.</p>)

const ResidentPeerMentorsPage = () => (
  <StudentGroupPage
    description={description}
    endpoint="/api/residentpeermentors"
  />
);

export default ResidentPeerMentorsPage 