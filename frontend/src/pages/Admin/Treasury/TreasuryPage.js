import React, { Component } from "react";
import BasePage from "../../BasePage";
import { Jumbotron, Row, Col } from "reactstrap";
import Account from "./Tabs/Account";



class TreasuryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      main_account: [],
      tours_account: [],
      reserve_account: [],
    };
  }


  render() {
    return (
      <BasePage loading={this.state.loading} header="Treasury">
          <Jumbotron>
          <Row className="d-flex align-items-">
            <h2>
              All accounts
            </h2>
          </Row>
          <Row className="d-flex flex-column">
                <div>Balance: {this.state.main_account[0]}</div>
                <div> Unallocated: {this.state.main_account[1]}</div>
          </Row>
          <br></br>
          <Row>
            <Col>
              <Row>
                <h4>Main House Account</h4>
              </Row>
              <Row className="d-flex flex-column">
                <div>Balance: {this.state.main_account[0]}</div>
                <div> Unallocated: {this.state.main_account[1]}</div>
              </Row>
            </Col>
            <Col>
              <Row>
                <h4>Tours Fund</h4>
              </Row>
              <Row className="d-flex flex-column">
                <div>Balance: {this.state.tours_account[0]}</div>
                <div> Unallocated: {this.state.tours_account[1]}</div>
              </Row>
            </Col>
            <Col>
              <Row>
                <h4>Reserve Account</h4>
              </Row>
              <Row className="d-flex flex-column">
                <div>Balance: {this.state.reserve_account[0]}</div>
                <div> Unallocated: {this.state.reserve_account[1]}</div>
              </Row>
            </Col>
          </Row>
          </Jumbotron>
          <Jumbotron>
            <Account></Account>
          </Jumbotron>
      </BasePage>
    );
  }
}

export default TreasuryPage;
