import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';
import { Link, useHistory } from 'react-router-dom';
import "../styles/Signup.css";

function Signup() {
    const [user, setUser] = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmployer, setIsEmployer] = useState(false);
    const [errors, setErrors] = useState([])
    const history = useHistory();
  
    const handleSubmit = (e) => {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      };
  
      e.preventDefault();
      fetch("/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
      .then((resp) => resp.json())
      .then((newUser) => {
        if (newUser?.errors) {
          setErrors([newUser.errors]);
          console.log("Yikes");
        } else {
          console.log("hey");
          setUser(newUser);
            // history.push('/profile')
        }
      });
      console.log(user)
    };
  
    return (
      <div className="signup-container">
        <div className="signup-form-container">
          <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            <div className="form-group">
              <input
                type="checkbox"
                name="isEmployer"
                id="isEmployer"
                checked={isEmployer}
                onChange={() => setIsEmployer(!isEmployer)}
              />
              <label htmlFor="isEmployer" className="checkbox-label">
                Are you an employer?
              </label>
            </div>
  
            <button type="submit" className="btn btn-primary btn-block">
              Signup
            </button>
          </form>
  
          <p className="signup-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  };

export default Signup