import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';
import { Link, useHistory } from 'react-router-dom';
import "../styles/Signup.css";

function CompanySignup() {
    const [user, setUser] = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmployer, setIsEmployer] = useState(true);
    const [erros, setErrors] = useState([])
    const history = useHistory();
  
    const handleSubmit = (e) => {
      const newCompany = {
        name: name,
        email: email,
        password: password,
      };
  
      e.preventDefault();
      fetch("/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCompany),
      })
      .then((resp) => resp.json())
      .then((newCompany) => {
        if (newCompany?.errors) {
          setErrors([newCompany.errors]);
          console.log("Yikes");
        } else {
          console.log("hey");
          setUser(newCompany);
            history.push('/company_profile')
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
              <label>Company Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Company Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
  
            {/* <div className="form-group">
              <input
                type="checkbox"
                name="isEmployer"
                id="isEmployer"
                checked={isEmployer}
                onChange={() => setIsEmployer(!isEmployer)}
              />
              <label htmlFor="isEmployer" className="checkbox-label">
                Are you an employee?
              </label>
            </div> */}
  
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

  export default CompanySignup;