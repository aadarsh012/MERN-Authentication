import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Register.module.css";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username, email, password },
        config
      );
      localStorage.setItem("authToken", data.token);
      props.history.push("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className={classes.register}>
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
