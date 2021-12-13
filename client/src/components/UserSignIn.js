import { Link, Navigate } from "react-router-dom";

const UserSignIn = (props) => {
  const user = props.user;
  if (!user.id) {
    return (
      <main>
        <div className="form--centered">
          <h2>Sign In</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.submit();
            }}
          >
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />

            <button className="button" type="submit">
              Sign In
            </button>

            <Link to="/">
              <button className="button button-secondary">Cancel</button>
            </Link>
          </form>
          <p>
            Don't have a user account? Click here to{" "}
            <Link to="/signup">sign up</Link>!
          </p>
        </div>
      </main>
    );
  } else {
    return (
      <Navigate to="/" />
      // <main>
      //   <div className="form--centered">
      //     <h2>Welcome back, {user.firstName}!</h2>
      //     <Link to="/">
      //       <button className="button">See Courses</button>
      //     </Link>
      //     <button className="button" onClick={props.signout}>
      //       Sign Out
      //     </button>
      //   </div>
      // </main>
    );
  }
};

export default UserSignIn;
