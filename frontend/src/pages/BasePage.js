import React, { Component } from "react";
import {
  Row,
  Col,
  Container
} from "reactstrap"
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/Topbar';
import './BasePage.css';
import { withRouter } from 'react-router-dom';
import { LINKS } from "../constants/nav";
import {withTheme} from 'styled-components';

class BasePage extends Component {

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
    let route = this.props.location;

    let colorIndex = LINKS.indexOf(
      LINKS.find(section => (
        section.some(item => item.url === route.pathname)
      ))
    );
  
    // Default to first section
    if (colorIndex === -1) {
      colorIndex = 0;
    }

    return (
      <main className="content">
        <Row className="m-0">
          <Sidebar colorIndex={colorIndex} {... this.props} open={this.state.displaySidebar} toggleSidebar={this.toggleSidebar} />
          <Col className="col-250-fixed" />
          <Col className="m-0 p-0">
            <Topbar toggleSidebar={this.toggleSidebar} colorIndex={colorIndex} />
            <Container fluid>
              <Row>
                <Col>
                <h1 className="text-white text-uppercase text-center my-4">{ this.props.header }</h1>
              { this.props.children }
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </main>
    );
  }
}

export default withRouter(withTheme(BasePage))