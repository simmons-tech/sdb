import React, { useState } from "react";
import {
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import BasePage from "../../BasePage";
import Summaries from "./Tabs/Summaries";
import Account from "./Tabs/Account";

const TreasuryPage = props => {
  const [activeTab, setActiveTab] = useState(
    props.match.params.account ? "2" : "1"
  );

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <BasePage {...props}>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1");
              }}
            >
              Accounts Summaries
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2");
              }}
            >
              Manage Account
            </NavLink>
          </NavItem>
        </Nav>
        <br />
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Summaries />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Account account={props.match.params.account} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </BasePage>
  );
};

export default withRouter(TreasuryPage);
