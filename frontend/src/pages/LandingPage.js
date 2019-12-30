import React, { Component } from "react";
import TodoList from '../components/TodoList';
import BasePage from './BasePage';
import * as ROUTES from '../constants/routes'

class LandingPage extends Component {
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
      <BasePage header="Todo App" {... this.props} >
        <TodoList {... this.props} />
      </BasePage>
    );
  }
}
export default LandingPage;
