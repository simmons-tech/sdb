import React, { Component } from "react";
import BasePage from "../BasePage";
import { Jumbotron, Table } from "reactstrap";

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    return (
      <BasePage loading={this.state.loading}>
        <Jumbotron>
          <Table striped>
            <thead>
              <tr>
                <th>
                  <h2>DB Administrators</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr><td>April Xie</td></tr>
              <tr><td>Arek Balata</td></tr>
              <tr><td>Jared Scott</td></tr>
              <tr><td>Jerry Zhang</td></tr>
              <tr><td>Jordan Wilke</td></tr>
              <tr><td>Luke Bordonaro</td></tr>
              <tr><td>Ronak Roy</td></tr>
              <tr><td>Samantha York</td></tr>
              <tr><td>Andi Qu</td></tr>
            </tbody>
          </Table>
        </Jumbotron>
        <footer>
          <hr></hr>
          Have questions/comments about the website or want to join the Simmons
          Tech Team?&nbsp;
          <a href="mailto:simmons-tech@mit.edu">Send us an email.</a>
          &nbsp;(Don't worry,{" "}
          <a
            href="https://drive.google.com/file/d/1ziSiTV2E9OnOxL0UQHJsy0ZMq9XFeVSE/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            we won't bite.
          </a>
          )
        </footer>
      </BasePage>
    );
  }
}
export default AboutPage;
