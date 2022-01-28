import React, { Component } from "react";
import BasePage from '../BasePage';
import { Jumbotron } from "reactstrap"

class MiscPage extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: false}
  }

  render() {
    return (
      <BasePage loading={this.state.loading}>
        {/* Reimbursment Jumbotron */}
        <Jumbotron>
            <h3>Reimbursment Instructions</h3>
            <a>TODO</a>
        </Jumbotron>

        {/* Reservation Jumbotron */}
        <Jumbotron>
            <h3>Reserve a Simmons space</h3>
            <div>Some Simmons public spaces need to be reserved. These are the multipurpose room (MPR), party room, and the terraces.</div>
            <div>Lounge spaces, Athena Cluster, and study rooms do not need to be reserved beforehand.</div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfWc9raZ4kSMNeuwCFaBBQ95-gYpafNKkqXr4U9aUgiSg0ipQ/viewform?vc=0&c=0&w=1&flr=0">Reserve a space</a>
        </Jumbotron>

        {/* Work Order Jumbotron */}
        <Jumbotron>
            <h3>Need something fixed? Submit a work order!</h3>
            <div>To submit a work order, visit MIT Atlas:</div>
            <a href="https://atlas.mit.edu/atlas/Main.action?tab=home&sub=group_servreq">Submit a work order</a>
        </Jumbotron>

        {/* Comment Card Jumbotron */}
        <Jumbotron>

            <h3>Have any questions or comments about Simmons' facilities? </h3>
            <div>Please fill out the comment card here:</div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfDwTJNh2usWGyA-FIra2QJwV2dZ4oaQwPwL0Rts2WFJY3vww/viewform">Comment Card</a>
        </Jumbotron>
      </BasePage>
    );
  }
}
export default MiscPage;
