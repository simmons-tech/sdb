import React, { Component } from "react";
import Nav from './components/Nav';
import TodoList from './components/TodoList';
import * as ROUTES from './constants/routes'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
    };
  }


  handle_logout = () => {
    localStorage.removeItem('token');
    this.props.history.push(ROUTES.LOGIN);
  };


  render() {
    return (
      <main className="content">
        <Nav {... this.props} />
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <TodoList {... this.props} />
      </main>
    );
  }
}
export default App;
