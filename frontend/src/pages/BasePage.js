import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
} from "reactstrap"
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/Topbar';
import './BasePage.css';
import { withRouter } from 'react-router-dom';
import { LINKS } from "../constants/nav";
import {withTheme} from 'styled-components';
import LoadingSpinner from "../components/LoadingSpinner"

class BasePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displaySidebar: true
    }
  }
  

  toggleSidebar = () => {
    this.setState({displaySidebar: !this.state.displaySidebar})
  }

  render() {
    let route = this.props.location;

    let colorIndex = LINKS.indexOf(
      LINKS.find(section => (
        section.some(item => route.pathname.indexOf(item.url) !== -1)
      ))
    );
  
    let navItem = LINKS.reduce((item, current) => item.concat(current), [])
        .find(item => item.url === route.pathname)
    
    let pageTitle = navItem? navItem.name : "SimDB"


    // Default to first section
    if (colorIndex === -1) {
      colorIndex = 0;
    }

    let spinnerColor = this.props.theme.topbarColors[
      this.props.theme.sidebarColorsOrder[colorIndex]
    ]

    return (
      <main className="content">
        <Row className="m-0">
          <Sidebar colorIndex={colorIndex} {... this.props} open={this.state.displaySidebar} toggleSidebar={this.toggleSidebar} />
          <Col className="col-250-fixed" />
          <Col className="m-0 p-0">
            <Topbar title={pageTitle} toggleSidebar={this.toggleSidebar} colorIndex={colorIndex} />
            <Container fluid className="mb-3">
              <Row>
                <Col>
                  <h1 className="text-uppercase text-center my-4">{ this.props.header }</h1>
                  {
                    this.props.loading ? <LoadingSpinner color={spinnerColor} /> : this.props.children
                  }
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
