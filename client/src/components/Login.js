import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';
import { Link, useHistory } from 'react-router-dom';
import '../styles/Login.css'


function Login() {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");
    const history = useHistory();
  
    function handleSubmit(e) {
      e.preventDefault();
  
      const currentUser = {
        email: email,
        password: password,
      };
  
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      })
        .then((resp) => resp.json())
        .then((currentUser) => {
          if (currentUser?.errors) {
            console.log("Yikes");
            setErrors([currentUser.errors]);
          } else {
            console.log("hey");
            setUser(currentUser);
            console.log(user)
            if (currentUser?.name) {
                history.push('/')
            } else {
                console.log(currentUser)
                history.push('/user_profile')
            }
              
          }
        });
    }
  
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <div className="signup-link">
          <p>Don't have an account? </p>
          <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    );
  }

export default Login