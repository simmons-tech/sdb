import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (<p>TODO: add description here.</p>)

const PleasureEducatorsPage = () => (
  <StudentGroupPage
    description={description}
    endpoint="/api/pleasureeducators"
  />
);

export default PleasureEducatorsPage 