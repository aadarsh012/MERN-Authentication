import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Components/routes/PrivateRoute";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/passwordreset/:resetToken" component={ResetPassword} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" />
      </Switch>
      <footer>
        <p>Created By AADARSH SHAW </p>
        <a href="https://github.com/aadarsh012" target="_blank">
          <img src="github-logo.png" />
        </a>
      </footer>
    </div>
  );
}

export default App;
