import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    <div>
      <form onSubmit={registerHandler}>
        <label>UserName</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <label>Email</label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label>Password</label>
        <input
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
