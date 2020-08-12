import React from "react";

export default function withSession(PageComponent) {

  return class extends React.Component {
    render() {
      let loginToken = localStorage.getItem('token');
      let username = localStorage.getItem('username');
      let user = JSON.parse(localStorage.getItem('user'))
      let isAdmin = JSON.parse(localStorage.getItem("is_admin"));
      let isDeskWorker = JSON.parse(localStorage.getItem("is_desk_worker"));
      return (
          <PageComponent
              username={username}
              user={user}
              isAdmin={isAdmin}
              isDeskWorker={isDeskWorker}
              loginToken={loginToken}
              {...this.props}
          />
      );
    }
  }
}