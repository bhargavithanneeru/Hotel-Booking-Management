import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to the login page after logout
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">PawlidayInnHotels</span>
        </Link>
        {user ? (
          <div className="navItems">
          <Link to="/profile" style={{ color: "inherit", textDecoration: "none", marginRight: "10px" }}>
            {user.username.toUpperCase()}
          </Link>
          <label onClick={handleLogout} className="logoutButton" 
          style={{ color: "inherit", textDecoration: "none", marginRight: "10px" }}>
              Logout
          </label>
        </div>
        ) : (
          <div className="navItems">
            <Link to="/register" style={{ color: "inherit", textDecoration: "none", marginRight: "10px"}}>
              Register
            </Link>
            <Link to="/login"style={{ color: "inherit", textDecoration: "none"}}>
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;





