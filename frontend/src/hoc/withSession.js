import React from "react";

export default function withSession(PageComponent) {

  return class extends React.Component {
    render() {
      let loginToken = localStorage.getItem('token');
      let username = localStorage.getItem('username');
      let user = JSON.parse(localStorage.getItem('user'))
      let isAdmin = JSON.parse(localStorage.getItem("is_admin"));
      let isDeskWorker = JSON.parse(localStorage.getItem("is_desk_worker"));
      let isDeskCaptain = JSON.parse(localStorage.getItem('is_desk_captain'));
      return (
          <PageComponent
              username={username}
              user={user}
              isAdmin={isAdmin}
              isDeskWorker={isDeskWorker}
              isDeskCaptain={isDeskCaptain}
              loginToken={loginToken}
              {...this.props}
          />
      );
    }
  }
}