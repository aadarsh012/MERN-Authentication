import axios from "axios";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

const Private = (props) => {
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      setError("Not Authorized");
      props.history.push("/register");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      };
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Not Authorized");
      }
    };
    fetchPrivateData();
  }, [props.history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    props.history.push("/login");
  };
  return error ? (
    <span>{error}</span>
  ) : (
    <div>
      {privateData}
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
export default withRouter(Private);
