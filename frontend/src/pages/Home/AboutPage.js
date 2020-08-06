import React, { Component } from "react";
import BasePage from '../BasePage';
import { Jumbotron, Table } from "reactstrap"

class AboutPage extends Component {

  render() {
    return (
      <BasePage>
      <Jumbotron>
        <Table striped>
          <thead>
            <h2>DB Administrators</h2>
          </thead>
          <tbody>
            <tr>April Xie</tr>
            <tr>Arek Balata</tr>
            <tr>Jared Scott</tr>
            <tr>Jerry Zhang</tr>
            <tr>Jordan Wilke</tr>
            <tr>Luke Bordonaro</tr>
            <tr>Ronak Roy</tr>
            <tr>Samantha York</tr>
          </tbody>
        </Table>
        </Jumbotron>
        <footer>
          <hr></hr>
          Have questions/comments about the website or want to join the Simmons Tech Team?&nbsp;
          <a href="mailto:simmons-tech@mit.edu">Send us an email.</a>
          &nbsp;(Don't worry, <a href="https://drive.google.com/file/d/1ziSiTV2E9OnOxL0UQHJsy0ZMq9XFeVSE/view" target="_blank">we won't bite.</a>)
        </footer>
      </BasePage>
    );
  }
}
export default AboutPage;