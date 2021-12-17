import { Link, Navigate } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

class CreateCourse extends Component {
  state = {
    submitted: false,
    errors: null,
  };

  componentDidMount() {
    this.setState({ submitted: false });
  }

  handleCreateCourse(e) {
    e.preventDefault();
    if (this.props.user.id) {
      const title = e.target.querySelector("#courseTitle").value;
      const description = e.target.querySelector("#courseDescription").value;
      const estimatedTime = e.target.querySelector("#estimatedTime").value;
      const materialsNeeded = e.target.querySelector("#materialsNeeded").value;
      const userId = this.props.user.id;
      const url = "http://localhost:8080/api/courses";
      const username = this.props.user.emailAddress;
      const password = this.props.password;
      const body = {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId,
      };
      const auth = {
        username,
        password,
      };
      axios
        .post(url, body, { auth })
        .then((res) => {
          this.setState({ submitted: true, errors: null });
        })
        .catch((err) => {
          const errors = err.response.data.errors;
          this.setState({ errors });
        });
    } else {
      alert("Please log in to add courses.");
    }
  }

  render() {
    const errors = this.state.errors;
    if (this.state.submitted) {
      return <Navigate to="/" />;
    } else {
      return (
        <main>
          <div className="wrap">
            <h2>Create Course</h2>
            {errors ? (
              <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  {errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <form
              onSubmit={(e) => {
                this.handleCreateCourse(e);
              }}
            >
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input id="courseTitle" name="courseTitle" type="text" />
                  <p>
                    By{" "}
                    {this.props.user.firstName + " " + this.props.user.lastName}
                  </p>
                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    defaultValue={""}
                  />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input id="estimatedTime" name="estimatedTime" type="text" />
                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea id="materialsNeeded" name="materialsNeeded" />
                </div>
              </div>
              <button className="button" type="submit">
                Create Course
              </button>
              <Link to="/">
                <button className="button button-secondary">Cancel</button>
              </Link>
            </form>
          </div>
        </main>
      );
    }
  }
}

export default CreateCourse;
