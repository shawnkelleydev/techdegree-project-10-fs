import { Navigate } from "react-router-dom";

const NoRoute = () => {
  return <Navigate to="/" replace={true} />;
};

export default NoRoute;
