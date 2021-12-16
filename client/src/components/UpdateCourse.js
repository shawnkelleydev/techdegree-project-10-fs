import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const UpdateCourse = (props) => {
  let { id } = useParams();
  id = parseInt(id);

  const [courses, setCourses] = useState();
  const [course, setCourse] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState();

  const getCourses = () => {
    axios
      .get(`http://localhost:8080/api/courses`)
      .then((res) => {
        setCourses(res.data);
        const course = courses.filter((course) => course.id === id)[0];
        setCourse(course);
      })
      .catch((err) => console.error);
  };

  //update if user match
  const handleUpdate = (e) => {
    //prevent page reload
    e.preventDefault();
    //get course id form state
    const title = document.querySelector("#courseTitle").value;
    const description = e.target.querySelector("#courseDescription").value;
    const valDiv = document.querySelector(".validation--errors");
    //set url
    const url = `http://localhost:8080/api/courses/${id}`;
    //request body
    const body = {
      title,
      description,
      estimatedTime: e.target.querySelector("#estimatedTime").value,
      materialsNeeded: e.target.querySelector("#materialsNeeded").value,
    };
    //auth
    const auth = {
      username: props.user.emailAddress,
      password: props.password,
    };

    //place request
    axios
      .put(url, body, { auth })
      .then((res) => {
        //set submitted to true
        setSubmitted(true);
      })
      .catch((err) => {
        //show validation div
        valDiv.style.display = "block";
        //set errors in state
        setErrors(err.response.data.errors);
      });
  };

  if (submitted) {
    return <Navigate to={`/courses/${id}`} />;
  } else if (!course) {
    getCourses();
    return (
      <main>
        <h1>loading ... </h1>
      </main>
    );
  } else {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors ? errors.map((err, i) => <li key={i}>{err}</li>) : null}
            </ul>
          </div>
          <form onSubmit={(e) => handleUpdate(e)}>
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
                  {course.user
                    ? "By" +
                      " " +
                      course.user.firstName +
                      " " +
                      course.user.lastName
                    : null}
                </p>
                <label htmlFor="courseDescription">Course Description</label>
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

            <Link to={`/courses/${id}`}>
              <button className="button button-secondary">Cancel</button>
            </Link>
          </form>
        </div>
      </main>
    );
  }
};

export default UpdateCourse;
