import React, { Component } from "react";
import Nav from '../components/Nav';

export default class BasePage extends Component {

  render() {
    return (
      <main className="content">
        <Nav {... this.props} />
        <h1 className="text-white text-uppercase text-center my-4">{ this.props.header }</h1>
        { this.props.children }
      </main>
    );
  }
}
