import axios from "axios";
import { useState, useEffect } from "react";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const sendEmailHandler = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const data = await axios.post("/api/auth/forgotpassword", { email }, config);
      setSuccess(data.data);
    } catch (error) {
      console.log(error.response.data.error);
      setSuccess(false);
      setError("Invalid Email!");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  return (
    <div className={classes.forgotPassword}>
      <span className={classes.error}>{error}</span>
      <form onSubmit={sendEmailHandler} className={classes.forgotPassword__form}>
        {success && (
          <span className={classes.sentSuccess}>Email Sent, Please Check Your Email.</span>
        )}
        <label htmlFor="forgotPassword__email"> Email </label>
        <input
          id="forgotPassword__email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};
export default ForgotPassword;
