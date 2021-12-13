import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";
import { Navigate } from "react-router-dom";

//PrivateRoute handles rendering of authenticated components

const PrivateRoute = (props) => {
  if (props.user.id) {
    if (props.action === "create") {
      return <CreateCourse user={props.user} password={props.password} />;
    } else if (props.action === "update") {
      return <UpdateCourse user={props.user} password={props.password} />;
    }
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
