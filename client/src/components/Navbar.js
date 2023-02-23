import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { UserContext } from "../UserContext";

function Navbar() {
  const [user, setUser] = useContext(UserContext);
  console.log(user);
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((resp) => {
      if (resp.ok) {
        setUser(null);
        alert("You have been logged out");
      }
    });
  }
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        JobVerify
      </Link>
      <div className="navbar-links">
        {user ? (
          user.name ? (
            <>
              <Link to="/employee_finder" className="navbar-link">
                Find Employees
              </Link>
              <Link to="/company_profile" className="navbar-link">
                Profile
              </Link>
              <Link to="/" onClick={handleLogout} className="navbar-link">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/user_profile" className="navbar-link">
                Profile
              </Link>
              <Link to="/" onClick={handleLogout} className="navbar-link">
                Logout
              </Link>
            </>
          )
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            {/* <Link to="/signup" className="navbar-link">Sign Up</Link> */}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
