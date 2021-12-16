import React, { Component } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

class CourseDetail extends Component {
  state = {
    courses: [],
    course: {},
    deleted: false,
  };

  componentDidMount() {
    this.getCourses();
    this.setState({ deleted: false });
  }

  //gets all courses and isolates current course data
  getCourses() {
    axios.get(`http://localhost:8080/api/courses`).then((res) => {
      this.setState({ courses: res.data });
      let courseId = window.location.href.split("/").splice(-1);
      courseId = parseInt(courseId);
      const course = this.state.courses.filter(
        (course) => course.id === courseId
      )[0];
      this.setState({ course });
    });
  }

  handleDelete(e) {
    e.preventDefault();

    const creds = {
      username: this.props.user.emailAddress,
      password: this.props.password,
    };
    if (this.state.course.userId === this.props.user.id) {
      const id = this.state.course.id;
      const url = `http://localhost:8080/api/courses/${id}`;
      axios
        .delete(url, { auth: creds })
        .then((res) => {
          this.setState({ deleted: true });
        })
        .catch((err) => {
          alert(`Man down!  Course was not deleted.  Error: ${err}`);
        });
    } else {
      alert("You are not authorized to delete this course.");
    }
  }

  render() {
    if (this.state.deleted) {
      return <Navigate to="/" />;
    } else {
      const course = this.state.course;
      if (course.id) {
        const courseId = course.id;
        //handle materials
        let materials = course.materialsNeeded;
        //handle description
        let description = course.description;

        return (
          <main>
            <div className="actions--bar">
              {/* conditional authentication-based menu rendering */}
              {this.props.user.id === this.state.course.userId ? (
                <div className="wrap">
                  <Link className="button" to={`/courses/${courseId}/update`}>
                    Update Course
                  </Link>
                  <Link
                    className="button"
                    to="/"
                    onClick={(e) => this.handleDelete(e)}
                  >
                    Delete Course
                  </Link>
                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </div>
              ) : (
                <div className="wrap">
                  <Link className="button button-secondary" to="/">
                    Return to List
                  </Link>
                </div>
              )}
            </div>
            <div className="wrap">
              <h2>Course Detail</h2>
              <form>
                <div className="main--flex">
                  <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>
                      By {course.user.firstName + " " + course.user.lastName}
                    </p>
                    <ReactMarkdown children={description} />
                    {/* {description.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))} */}
                  </div>
                  <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>
                      {course.estimatedTime ? course.estimatedTime : "none"}
                    </p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown children={materials} />
                  </div>
                </div>
              </form>
            </div>
          </main>
        );
      } else {
        return (
          <main>
            <h1>Loading...</h1>
          </main>
        );
      }
    }
  }
}

export default CourseDetail;
