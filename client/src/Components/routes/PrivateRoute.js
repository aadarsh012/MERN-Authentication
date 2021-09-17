import { Switch, Route, Redirect } from "react-router-dom";
import Private from "../PrivateComponent/Private";

const PrivateRoute = (props) => {
  return (
    <Route
      {...props}
      render={() => (localStorage.getItem("authToken") ? <Private /> : <Redirect to="/register" />)}
    />
  );
};
export default PrivateRoute;
