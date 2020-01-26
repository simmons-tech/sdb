import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (<p>Medlinks serve as liaisons between undergraduate students and MIT Medical. 
They can answer questions about MIT Medical's policies and services and can 
help you figure out when and how to connect with other MIT resources. They 
can also provide single doses of common over-the-counter medications, first-aid 
materials, and safer-sex supplies.

To reach out to all Simmons Medlinks, email <a href="mailto:simmons-medlinks@mit.edu">simmons-medlinks@mit.edu</a>.</p>)



const MedlinkPage = () => (
  <StudentGroupPage
    description={description}
    endpoint="/api/medlinks"
  />
);

export default MedlinkPage 