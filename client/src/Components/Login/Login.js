import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const { data } = await axios.post("/api/auth/login", { email, password }, config);

      localStorage.setItem("authToken", data.token);
      props.history.push("/");
    } catch (error) {
      setError("Invalid Credentials!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className={classes.login}>
      <span className={classes.error}>{error}</span>
      <form onSubmit={(event) => loginHandler(event)} className={classes.login__form}>
        <label htmlFor="login__email">Email ID</label>
        <input
          id="login__email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="login__password">Password</label>
        <input
          id="login__password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <span>
          <Link to="/forgotPassword">Forgot Password?</Link>
        </span>
        <button type="submit"> Login</button>
        <span>
          Don't have an account? <Link to="/register"> Register</Link>
        </span>
      </form>
    </div>
  );
};
export default Login;
