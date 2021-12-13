import { Navigate } from "react-router-dom";
import React, { Component } from "react";

class UserSignOut extends Component {
  componentDidMount(e) {
    this.props.signOut(e);
  }
  render() {
    return <div>{<Navigate to="/" />}</div>;
  }
}

export default UserSignOut;
