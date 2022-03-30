import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (
  <p>
    GRAs are members of a cluster or house team whose charge is to support and
    enhance the residential living and learning environment. A GRA works to
    fosters a supportive, safe, and positive living environment built upon
    shared community standards and mutual respect. GRAs are mentors and
    educators who encourage personal growth, provide outlets for managing
    stress, and facilitate positive interpersonal relationships.
  </p>
);

const GraPage = () => (
  <StudentGroupPage description={description} endpoint="/api/users/gras/" />
);

export default GraPage;
