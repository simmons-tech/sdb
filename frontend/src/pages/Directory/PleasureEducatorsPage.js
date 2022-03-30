import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (
  <p>
    Pleasure is a student-led effort to promote healthy relationships and reduce
    sexual violence at MIT. Peer Educators act as leaders to facilitate
    discussions about a variety of relationship and sexual health topics.
  </p>
);

const PleasureEducatorsPage = () => (
  <StudentGroupPage
    description={description}
    endpoint="/api/pleasureeducators"
  />
);

export default PleasureEducatorsPage;
