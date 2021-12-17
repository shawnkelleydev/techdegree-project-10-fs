import { Link, Navigate } from "react-router-dom";
import React, { Component } from "react";

class UserSignUp extends Component {
  state = {
    submitted: false,
  };

  componentDidMount() {
    this.setState({ submitted: false });
  }

  render() {
    const errors = this.props.errors;
    if (this.state.submitted) {
      return <Navigate to="/" />;
    } else {
      return (
        <main>
          <div className="form--centered">
            <h2>Sign Up</h2>
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
                if (this.props.submit(e)) {
                  this.setState({ submitted: true });
                }
              }}
            >
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" />
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" />
              <label htmlFor="emailAddress">Email Address</label>
              <input id="emailAddress" name="emailAddress" type="email" />
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />

              <button className="button" type="submit">
                Sign Up
              </button>

              <Link to="/">
                <button className="button button-secondary">Cancel</button>
              </Link>
            </form>
            <p>
              Already have a user account? Click here to{" "}
              <Link to="/signin">sign in</Link>!
            </p>
          </div>
        </main>
      );
    }
  }
}

export default UserSignUp;
