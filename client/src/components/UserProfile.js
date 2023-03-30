import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import JobCardEmployees from "./JobCardEmployees";
import "../styles/Profile.css";

function UserProfile({ jobs, setJobs }) {
  const [user] = useContext(UserContext);
  console.log(jobs);

  const myJobs = jobs?.filter((job) => job.employee_id === user.id);

  const unverifiedJobs = myJobs.filter((job) => job.verifications.length <= 0);

  const verifiedJobs = myJobs.filter((job) => job.verifications.length > 0);


  return (
    <div>
      <div className="user-profile-main">
        <h1>
          Welcome to your Profile, {user?.first_name} {user?.last_name}
        </h1>
        <div>
          <Link to="/edit_profile" className="btn btn-primary">
            Edit Profile
          </Link>
            <Link to="/create_job" className="btn btn-primary">
              Create New Job
            </Link>
        </div>
        <h3>You have {verifiedJobs.length} Verified Jobs!</h3>
      </div>
      <div className="user-profile">
      <div className="left-column">
      <h3 className="verified-jobs"></h3>
        {unverifiedJobs.length > 0 ? (
          unverifiedJobs.map((job) => (
            <JobCardEmployees
              key={job.id}
              job={job}
              setJobs={setJobs}
              jobs={jobs}
            />
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
      <div className="right-column">
        <h3 className="verified-jobs"></h3>
        {verifiedJobs.length > 0 ? (
          verifiedJobs.map((job) => (
            <JobCardEmployees key={job.id} job={job} setJobs={setJobs} jobs={jobs} />
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
      </div>
    </div>
  );
}

export default UserProfile;
