import axios from "axios";
import "../login/login.css"
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import backgroundImage from "./images/Login_Background.jpg"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    //console.log(credentials)
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials,{withCredentials: true});
      console.log("response",res)
      console.log("cookies", document.cookie)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
    
  };

const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Adjust as needed
    backgroundRepeat: 'no-repeat', // Adjust as needed
  };


  return (
    <div className="login" style={containerStyle}>
      <div className="lContainer">
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <Link to="/forgotpassword" className="forgotPasswordLink" style={{ color: 'blue' }}>
          Forgot Password?
        </Link>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span style={{ color: 'red' }}>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;



