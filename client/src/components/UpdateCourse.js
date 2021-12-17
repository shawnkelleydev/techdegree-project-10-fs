import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateCourse = (props) => {
  //grab id from url
  let { id } = useParams();
  id = parseInt(id);

  //hooks for state
  const [courses, setCourses] = useState();
  const [course, setCourse] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState();

  //api call

  useEffect(() => {
    const getCourses = () => {
      axios
        .get(`http://localhost:8080/api/courses`)
        .then((res) => {
          setCourses(res.data);
          //checks for courses before filter (was getting errors without condition)
          if (courses) {
            const course = courses.filter((course) => course.id === id)[0];
            setCourse(course);
          }
        })
        .catch((err) => console.error("Man down! ", err));
    };
    if (!course) {
      getCourses();
    }
  }, [id, courses, course]);

  //update if user match
  const handleUpdate = (e) => {
    //prevent page reload
    e.preventDefault();
    //get course id form state
    const title = document.querySelector("#courseTitle").value;
    const description = e.target.querySelector("#courseDescription").value;
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
        //set errors in state
        setErrors(err.response.data.errors);
      });
  };

  if (submitted) {
    return <Navigate to={`/courses/${id}`} />;
  } else if (!course) {
    return (
      <main>
        <div className="wrap">
          <h1>loading ... </h1>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        <div className="wrap">
          <h2>Update Course</h2>
          {/* conditionally renders validation div */}
          {errors ? (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          ) : null}

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
