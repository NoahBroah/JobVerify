import React, { useEffect, useState } from "react";

import { UserProvider } from "./UserContext";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import CreateNewJob from "./components/CreateNewJob";
import Home from "./components/Home";
// import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import CreateNewJob from "./components/CreateNewJob";
import CompanyProfile from "./components/CompanyProfile";
import CompanySignup from "./components/CompanySignup";
import ViewJob from "./components/ViewJob";
import ViewEmployees from "./components/ViewEmployees";
// import Profile from "./components/Profile";
// import Signup from "./components/Signup";
// import { JobsProvider } from "./JobsContext";


function App() {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState([])

  useEffect(() => {
    fetch("/jobs").then((resp) => {
      if (resp?.ok) {
        resp.json().then((jobs) => setJobs(jobs));
      } else {
        resp.json().then((errorData) => setErrors(errorData.errors));
      }
      
    });
  }, []);

  return (
    <UserProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/company_signup">
              <CompanySignup />
            </Route>
            <Route exact path="/user_profile" >
              <UserProfile jobs={jobs} setJobs={setJobs}/>
            </Route>
            <Route exact path="/company_profile" >
              <CompanyProfile jobs={jobs} setJobs={setJobs}/>
            </Route>
            <Route exact path="/jobs/:id" >
              <ViewJob jobs={jobs} setJobs={setJobs}/>
            </Route>
            <Route exact path="/create_job" >
              <CreateNewJob jobs={jobs} setJobs={setJobs}/>
            </Route>
            <Route exact path="/employee_finder" >
              <ViewEmployees jobs={jobs} setJobs={setJobs}/>
            </Route>
          </Switch>
        </Router>
    </UserProvider>
     
    
  );
};

export default App;

