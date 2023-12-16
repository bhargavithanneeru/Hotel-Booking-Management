import axios from "axios";
import "./resetpassword.css"
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import backgroundImage from "../login/images/Login_Background.jpg"

const ResetPassword = () => {
    const {token} = useParams();
  const [credentials, setCredentials] = useState({
    newPassword: "",
    resetToken:token
  });
  const [disabled,setDisabled] = useState(true);
//   const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {

    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    
  };

  const handleClick = async (e) => {
    e.preventDefault();
    // dispatch({ type: "RESET_START" });
    try {
      console.log("credentials", credentials)
      const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"/auth/reset-password", credentials);
      console.log("Reset Password Response:", res.data);
    //   dispatch({ type: "RESET_SUCCESS", payload: res.data.details });
    
      navigate("/login")
    } catch (err) {
    //   dispatch({ type: "RESET_FAILURE", payload: err.response.data });
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
          type="password"
          placeholder="Enter Password"
          id="newPassword"
          onChange={handleChange}
          className="lInput"
        />
        <button  onClick={handleClick} className="lButton">
          Change Password
        </button>
        {/* {error && <span style={{ color: 'red' }}>{error.message}</span>} */}
      </div>
    </div>
  );
};

export default ResetPassword;



