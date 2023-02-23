import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import JobCardCompanies from "./JobCardCompanies";
import "../styles/Profile.css";

function CompanyProfile({ jobs, setJobs }) {
  const [user] = useContext(UserContext);
  console.log(jobs);


  const companyJobs = jobs?.filter((job) => job?.company === user?.name)

  const unverifiedJobs = companyJobs?.filter((job) => job?.company === user?.name);
  //    jobs.filter((job) => job.employee_id === user.id);

  const verifiedJobs = companyJobs?.filter(
    (verifiedJob) => verifiedJob.verifications.length > 0
  );


  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-content">
          <h1>
            Welcome to <span>{user?.name}'s</span> Company profile.
          </h1>
        </div>
      </div>
      <div>
          <Link to="/employee_finder" className="btn btn-primary">
            Find Employees
          </Link>
        </div>
      <div className="left-column">
      <h3 className="verified-jobs">Unverified Jobs:</h3>
        {unverifiedJobs.length <= 0 ? (
          unverifiedJobs.map((job) => (
            <JobCardCompanies key={job.id} job={job} setJobs={setJobs} jobs={jobs} />
          ))
        ) : (
          <p>No Jobs found</p>
        )}
      </div>
      <div className="right-column">
        <h3 className="verified-jobs">Verified Jobs:</h3>
        {verifiedJobs.length > 0 ? (
          verifiedJobs.map((job) => (
            <JobCardCompanies key={job.id} job={job} setJobs={setJobs} jobs={jobs} />
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default CompanyProfile;
