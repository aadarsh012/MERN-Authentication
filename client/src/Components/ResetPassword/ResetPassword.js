import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./ResetPassword.module.css";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

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
    } catch (error) {
      console.log(error.response.data.error);
      setSuccess(false);
    }
  };

  return (
    <div className={classes.resetPassword}>
      <form onSubmit={resetPasswordHandler} className={classes.resetPassword__form}>
        <label>New Password</label>
        <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
        {success && (
          <span>
            Successful! <Link to="/login">Login</Link>
          </span>
        )}
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};
export default ResetPassword;
