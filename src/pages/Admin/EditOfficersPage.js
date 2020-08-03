import React, { Component } from "react";
import BasePage from '../BasePage';
import {Col, Row} from "reactstrap"
import OfficersEditor from '../../components/OfficersEditor'


class EditOfficersPage extends Component {

  render() {
    return (
      <BasePage header="" {... this.props} >
        <Row>
          <Col>
            <OfficersEditor/>
          </Col>
        </Row>
      </BasePage>
    );
  }
}
export default EditOfficersPage;
