import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (<p>TODO: add description here</p>)



const GraPage = () => (
  <StudentGroupPage
    description={description}
    endpoint="/api/users/gras/"
  />
);

export default GraPage 