import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    this.getCourses();
  }

  getCourses() {
    axios.get(`http://localhost:8080/api/courses`).then((res) => {
      this.setState({ courses: res.data });
    });
  }

  render() {
    return (
      <div className="wrap main--grid">
        {this.state.courses.map((course) => {
          return (
            <Link
              className="course--module course--link"
              to={`courses/${course.id}`}
              key={course.id}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          );
        })}

        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
            </svg>
            New Course
          </span>
        </Link>
      </div>
    );
  }
}

export default Courses;
