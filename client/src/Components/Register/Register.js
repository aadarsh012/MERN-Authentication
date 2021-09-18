import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Register.module.css";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // useEffect(()=>{
  //     if(!localStorage.getItem(authToken))
  // },[props.history])

  const registerHandler = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (!username || !email || !password) {
      setError("Please Provide Your Credentials");
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    if (password.length < 8) {
      setError("Weak Password");
      setTimeout(() => {
        setError("");
      }, 2000);
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      props.history.push("/");
    } catch (error) {}
  };

  return (
    <div className={classes.register}>
      <span className={classes.error}>{error}</span>
      <form onSubmit={registerHandler} className={classes.register__form}>
        <label htmlFor="register__username">UserName</label>
        <input
          id="register__username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="register__email">Email</label>
        <input
          id="register__email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="register__password">Password</label>
        <input
          id="register__password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit"> Register </button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
export default Register;
