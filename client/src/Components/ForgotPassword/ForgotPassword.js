import axios from "axios";
import { useState, useEffect } from "react";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

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
    }
  };

  return (
    <div className={classes.forgotPassword}>
      <form onSubmit={sendEmailHandler} className={classes.forgotPassword__form}>
        {success && (
          <span className={classes.sentSuccess}>Email Sent, Please Check Your Email.</span>
        )}
        <label> Email </label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};
export default ForgotPassword;
