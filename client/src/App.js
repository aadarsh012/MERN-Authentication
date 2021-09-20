import { Route, Switch } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./Components/routes/PrivateRoute";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Aux from "./HOC/auxilliary";

function App() {
  return (
    <Aux>
      <div className="App">
        <Switch>
          <Route path="/passwordreset/:resetToken" component={ResetPassword} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" />
        </Switch>
      </div>
      <footer>
        <p>Created By AADARSH SHAW | </p>
        <a href="https://github.com/aadarsh012">
          <img src="github-logo.png" />
        </a>
      </footer>
    </Aux>
  );
}

export default App;
