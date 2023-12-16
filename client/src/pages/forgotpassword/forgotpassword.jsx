import axios from "axios";
import "../forgotpassword/forgotpassword.css"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import backgroundImage from "../login/images/Login_Background.jpg"
import '../forgotpassword/forgotpassword.css'

const ForgotPassword = () => {
  const [credentials, setCredentials] = useState({
    email: ""
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials)
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "FORGOT_PASSWORD_START" }); // Dispatch a "forgot password" action
    try {
      const res = await axios.post("/auth/forgotpassword", credentials); // Call the "forgot-password" endpoint
      dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: res.data });
      setStatus(res.status);
      // You may add a message to inform the user that the reset link has been sent
      // Example: setInfoMessage("Password reset link sent. Check your email.");
    } catch (err) {
      dispatch({ type: "FORGOT_PASSWORD_FAILURE", payload: err.response.data });
      setStatus(null);
    }
  };

const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Adjust as needed
    backgroundRepeat: 'no-repeat', // Adjust as needed
  };


  return (
    <div className="forgotpassword" style={containerStyle}>
      <div className="lContainer">
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Submit
        </button>
        {error && <span style={{ color: 'red' }}>{error.message}</span>}
        {status && <div style={{ color: "green" }}>Successfully sent the email!</div>}
      </div>
    </div>
  );
};

export default ForgotPassword;
