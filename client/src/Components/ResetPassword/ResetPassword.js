import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./ResetPassword.module.css";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [errorPage, setErrorPage] = useState(false);

  useEffect(() => {
    const resetToken = localStorage.getItem("resetToken");
    if (resetToken !== props.match.params.resetToken) {
      localStorage.removeItem("resetToken");
      setErrorPage(true);
    }
  }, [props.match]);

  const resetPasswordHandler = async (event) => {
    event.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const data = await axios.put(
        `/api/auth/resetpassword/${props.match.params.resetToken}`,
        { password },
        config
      );
      setSuccess(data.data);
      localStorage.removeItem("resetToken");
    } catch (error) {
      setSuccess(false);
      setError("Weak Password!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  if (errorPage) {
    return (
      <div className={classes.errorPage}>
        <h2>IT SEEMS LIKE THE PASSWORD HAS ALREADY BEEN RESET.</h2>
        <p>
          Please <Link to="/login">click here</Link> to Login.
        </p>
      </div>
    );
  } else {
    return (
      <div className={classes.resetPassword}>
        <span className={classes.error}>{error}</span>
        <form onSubmit={resetPasswordHandler} className={classes.resetPassword__form}>
          <label htmlFor="resetPassword__password">New Password</label>
          <input
            id="resetPassword__password"
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {success && (
            <span>
              Successful! <Link to="/login">Login</Link>
            </span>
          )}
          <button type="submit">Reset</button>
        </form>
      </div>
    );
  }
};
export default ResetPassword;
