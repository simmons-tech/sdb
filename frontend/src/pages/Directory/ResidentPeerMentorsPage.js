import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (
  <p>
    The Resident Peer Mentor Program (RPM) gives upperclass students an
    opportunity to support and create community for incoming first year
    students.
  </p>
);

const ResidentPeerMentorsPage = () => (
  <StudentGroupPage
    description={description}
    endpoint="/api/residentpeermentors"
  />
);

export default ResidentPeerMentorsPage;
