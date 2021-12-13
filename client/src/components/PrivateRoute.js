import { Navigate } from "react-router-dom";

//PrivateRoute uses a method from App.js to check for
//authentication status, and then renders the child if
//authenticated.

const PrivateRoute = (props) => {
  const authed = props.auth;
  const children = props.children;
  return authed ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
