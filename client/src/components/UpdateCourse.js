import { Link, Navigate } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

class UpdateCourse extends Component {
  state = {
    courses: [],
    course: {},
    submitted: false,
  };

  //get courses / current course on component mount
  componentDidMount() {
    this.getCourses();
    this.setState({ submitted: false });
  }

  getCourses() {
    axios.get(`http://localhost:5000/api/courses`).then((res) => {
      //set all courses in state
      this.setState({ courses: res.data });
      //set current course in state
      let courseId = window.location.href.split("/").splice(-2)[0];
      courseId = parseInt(courseId);
      const course = this.state.courses.filter(
        (course) => course.id === courseId
      )[0];
      this.setState({ course });
    });
  }

  //update if user match
  handleUpdate(e) {
    e.preventDefault();
    //get course id form state
    const userId = this.state.course.userId;
    const courseId = this.state.course.id;
    const title = document.querySelector("#courseTitle").value;
    const description = e.target.querySelector("#courseDescription").value;
    const valDiv = document.querySelector(".validation--errors");

    //checks for ownership, title, and description
    if (
      userId === this.props.user.id &&
      title.length > 0 &&
      description.length > 0
    ) {
      //set url
      const url = `http://localhost:5000/api/courses/${courseId}`;
      //request body
      const body = {
        title,
        description,
        estimatedTime: e.target.querySelector("#estimatedTime").value,
        materialsNeeded: e.target.querySelector("#materialsNeeded").value,
      };
      //auth
      const auth = {
        username: this.props.user.emailAddress,
        password: this.props.password,
      };

      //place request
      axios.put(url, body, { auth }).then((res) => {
        if (res.status === 204) {
          //hide validation error div
          valDiv.style.display = "none";
          this.setState({ submitted: true });
        } else {
          alert(`Man down!  Course did not update.  Error: ${res.status}`);
        }
      });
    } else {
      valDiv.style.display = "block";
      const errorList = valDiv.querySelector("ul");
      errorList.innerHTML = "";
      const errors = [];
      if (title.length === 0) {
        errors.push("Please provide a title.");
      }
      if (description.length === 0) {
        errors.push("Please provide a description.");
      }
      errors.forEach((error, i) =>
        errorList.insertAdjacentHTML("beforeend", `<li key=${i}>${error}</li>`)
      );
    }
  }

  render() {
    if (this.state.submitted) {
      return <Navigate to={`/courses/${this.state.course.id}`} />;
    } else {
      //get course id from url
      let courseId = window.location.href.split("/").splice(-2)[0];
      courseId = parseInt(courseId);
      const course = this.state.courses.filter(
        (course) => course.id === courseId
      )[0];

      if (course) {
        return (
          <main>
            <div className="wrap">
              <h2>Update Course</h2>
              <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul></ul>
              </div>
              <form onSubmit={(e) => this.handleUpdate(e)}>
                <div className="main--flex">
                  <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input
                      id="courseTitle"
                      name="courseTitle"
                      type="text"
                      defaultValue={course.title}
                    />
                    <p>
                      {this.state.course.user
                        ? "By" +
                          " " +
                          this.state.course.user.firstName +
                          " " +
                          this.state.course.user.lastName
                        : null}
                    </p>
                    <label htmlFor="courseDescription">
                      Course Description
                    </label>
                    <textarea
                      id="courseDescription"
                      name="courseDescription"
                      defaultValue={course.description}
                    />
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      defaultValue={course.estimatedTime}
                    />
                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      defaultValue={course.materialsNeeded}
                    />
                  </div>
                </div>

                <button className="button" type="submit">
                  Update Course
                </button>

                <Link to={`/courses/${courseId}`}>
                  <button className="button button-secondary">Cancel</button>
                </Link>
              </form>
            </div>
          </main>
        );
      } else {
        return (
          <main>
            <h1>loading ... </h1>
          </main>
        );
      }
    }
  }
}

export default UpdateCourse;
