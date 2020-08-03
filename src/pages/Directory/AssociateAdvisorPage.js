import StudentGroupPage from "./StudentGroupPage";
import React from "react";

const description = (<p>
  Associate Advisors are student representatives of the UAAP whose
job is to help freshmen adjust to MIT. If you're a freshmen and have questions about anything, ranging from student life to academics, feel free to reach out to us!
</p>)



const AssociateAdvisorPage = () => (
  <StudentGroupPage
    description={description}
    endpoint="/api/associateadvisors"
  />
);

export default AssociateAdvisorPage 