import React from "react";
import { withRouter } from 'react-router-dom'

class Nav extends React.Component {

  handle_logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }

  render() {
    const logged_out_nav = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" onClick={() => this.props.history.push('/login')}>Login</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => this.props.history.push('/signup')}>Signup</a>
        </li>
      </ul>
    );

    const logged_in_nav = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" onClick={this.handle_logout}>Logout</a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {this.props.loginToken ? logged_in_nav : logged_out_nav}
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
