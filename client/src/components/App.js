import axios from "axios";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import "../App.css";

//components
import Header from "./Header";
import Courses from "./Courses";
import CourseDetail from "./CourseDetail";
import UserSignIn from "./UserSignIn";
import UserSignUp from "./UserSignUp";
import UserSignOut from "./UserSignOut";
import PrivateRoute from "./PrivateRoute";
import NoRoute from "./NoRoute";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";

class App extends Component {
  state = {
    user: {},
    password: "",
    signOut: () => this.signOut(),
    signIn: () => this.signIn(),
    errors: null,
  };

  /*
  
  As suggested in the project instructions, I'm letting components manage
  their own api calls / state.
  
  */

  componentDidMount() {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username && password) {
      const auth = {
        username,
        password,
      };
      const url = "http://localhost:8080/api/users";
      axios
        .get(url, { auth })
        .then((res) => {
          this.setState({ user: res.data.user });
          this.setState({ password });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }

  //Posts new users to the api.

  signUp(e) {
    e.preventDefault();
    let success = false;
    const firstName = e.target.querySelector("#firstName").value;
    const lastName = e.target.querySelector("#lastName").value;
    const emailAddress = e.target.querySelector("#emailAddress").value;
    const password = e.target.querySelector("#password").value;
    const data = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
    const url = "http://localhost:8080/api/users";
    axios
      .post(url, data)
      .then((res) => {
        this.setState({ user: data, password, errors: null });
        success = true;
      })
      .catch((err) => {
        const errors = err.response.data.errors;
        this.setState({ errors });
      });
    return success;
  }

  //gets user data from the api and provides user data / password to state
  //the password is set seperately because the password stored in the api is
  //hashed.
  signIn() {
    const emailField = document.querySelector("#emailAddress");
    const passwordField = document.querySelector("#password");
    const email = emailField.value;
    const password = passwordField.value;
    this.setState({ password });
    const auth = {
      username: email,
      password,
    };
    emailField.value = "";
    passwordField.value = "";
    const url = "http://localhost:8080/api/users";
    axios
      .get(url, { auth })
      .then((res) => {
        this.setState({ user: res.data.user });
        localStorage.setItem("username", email);
        localStorage.setItem("password", password);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  //clears everything to effect user log out
  signOut() {
    this.setState({ user: {}, password: "" });
    localStorage.clear();
  }

  //checks for authenticated user
  isAuth() {
    return this.state.user.id ? true : false;
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user.firstName} />
        <Routes>
          <Route path="/" element={<Courses user={this.state.user} />} />
          <Route path="courses">
            <Route
              path=":id"
              element={
                <CourseDetail
                  user={this.state.user}
                  password={this.state.password}
                />
              }
            />
            <Route
              path=":id/update"
              element={
                <PrivateRoute auth={this.isAuth()}>
                  <UpdateCourse
                    user={this.state.user}
                    password={this.state.password}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="create"
              element={
                <PrivateRoute auth={this.isAuth()}>
                  <CreateCourse
                    user={this.state.user}
                    password={this.state.password}
                  />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="signin"
            element={
              <UserSignIn
                submit={this.state.signIn}
                user={this.state.user}
                signout={this.state.signOut}
              />
            }
          />
          <Route
            path="signup"
            element={
              <UserSignUp
                submit={(e) => this.signUp(e)}
                errors={this.state.errors}
              />
            }
          />
          <Route
            path="signout"
            element={<UserSignOut signOut={this.state.signOut} />}
          />
          <Route path="*" element={<NoRoute />} />
        </Routes>
      </div>
    );
  }
}

export default App;
