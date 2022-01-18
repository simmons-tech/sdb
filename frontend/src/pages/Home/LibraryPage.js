import React, { Component } from "react";
import BasePage from '../BasePage';
import { Jumbotron } from "reactstrap"

class AboutPage extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: false}
  }

  render() {
    return (
      <BasePage loading={this.state.loading}>
        <Jumbotron>
            Welcome to the Simmons' Library!
            <br/>
            This is the digital catalog of what we have in the library (somewhat outdated):  
            <a href="https://www.librarything.com/catalog/simmons_hall">Library Catalog</a> 
            <br/>
            To use the digital catalog, this is the users guide: 
            <a>TODO</a>

            <br/>
            <br/>
            If you have any questions, please email the library chairs at simmons-library [at] mit [dot] edu
        </Jumbotron>
      </BasePage>
    );
  }
}
export default AboutPage;
