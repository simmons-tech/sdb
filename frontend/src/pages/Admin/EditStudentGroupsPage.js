import React, { Component } from "react";
import BasePage from '../BasePage';
import {Col, Row} from "reactstrap"
import StudentGroupEditor from '../../components/StudentGroupEditor'


class EditStudentGroupsPage extends Component {

  render() {
    return (
      <BasePage header="" {... this.props} >
        <Row>
          <Col lg={6} xl={4}>
            <StudentGroupEditor header="Medlinks" endpoint="/api/medlinks/" />
          </Col>
          <Col lg={6} xl={4}>
            <StudentGroupEditor header="Associate Advisors" endpoint="/api/associateadvisors/" />
          </Col>
          <Col lg={6} xl={4}>
            <StudentGroupEditor header="Resident Peer Mentors" endpoint="/api/residentpeermentors/" />
          </Col>
          <Col lg={6} xl={4}>
            <StudentGroupEditor header="Pleasure Educators" endpoint="/api/pleasureeducators/" />
          </Col>
        </Row>
      </BasePage>
    );
  }
}
export default EditStudentGroupsPage;
