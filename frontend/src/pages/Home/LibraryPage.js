import React, { Component } from "react";
import BasePage from '../BasePage';
import { Jumbotron } from "reactstrap"

class LibraryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: false}
  }

  render() {
    return (
      <BasePage loading={this.state.loading}>
        <Jumbotron>
            <h3>Welcome to the Simmons' Library!</h3>
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
export default LibraryPage;
