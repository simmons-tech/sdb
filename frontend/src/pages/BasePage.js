import React, { Component } from "react";
import {
  Row,
  Col
} from "reactstrap"
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/Topbar';
import './BasePage.css';

export default class BasePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displaySidebar: true
    }
  }

  toggleSidebar = () => {
    console.log("toggle")
    this.setState({displaySidebar: !this.state.displaySidebar})
  }

  render() {
    return (
      <main className="content">
        <Row className="m-0">
          <Sidebar {... this.props} open={this.state.displaySidebar} toggleSidebar={this.toggleSidebar} />
          <Col className="col-250-fixed" />
          <Col>
            <Topbar toggleSidebar={this.toggleSidebar} />
            <h1 className="text-white text-uppercase text-center my-4">{ this.props.header }</h1>
              { this.props.children }
          </Col>
        </Row>
      </main>
    );
  }
}
