import React, { useContext, useEffect, useState } from "react";
import "../styles/JobCard.css";
import { UserContext } from "../UserContext";
import DOMPurify from "dompurify";


const JobCardCompanies = ({ job, setJobs, jobs }) => {
  const [user] = useContext(UserContext);
  const [errors, setErrors] = useState([])

  function handeVerifyClick(id) {
    const employee = job.employee_id

    fetch("/verifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job_id: id }),
    }).then((resp) => resp.json())
    .then((verifiedJob) => {
      if (verifiedJob?.errors) {
        setErrors(verifiedJob.errors)
      } else {
        setJobs([...jobs])
      }
    })

    fetch("/verified_jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employee_id: employee  }),
    }).then((resp) => resp.json())
    .then((verifiedEmployee) => {
      if (verifiedEmployee?.errors) {
        setErrors(verifiedEmployee.errors)
      } else {
        setJobs([...jobs])
      }
    })
  }

  const sanitizedDescription = DOMPurify.sanitize(job.description);
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h2 className="job-card-title">{job.title}</h2>
        <span> at </span>
        <h3 className="job-card-company">{job.company}</h3>
        <div className="job-card-dates">
          <span className="job-card-small-text job-card-italic">
            {new Date(job.from_date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <span> - </span>
          <span className="job-card-small-text job-card-italic">
            {new Date(job.to_date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="job-card-body">
        <div
          className="job-card-description"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        ></div>
        <div className="job-card-details">
          <div className="job-card-verified">
            <span className="job-card-label">{job.employee.first_name}</span>
            <span className="job-card-label">{" "}</span>
            <span className="job-card-label">{job.employee.last_name}</span>
          </div>
        </div>
      </div>
      <div className="job-card-footer">
        {job.verifications.length > 0 ? (
          <div>
            <h3>Verified</h3>
          </div>
        ) : (
          <button
            className="job-card-link"
            onClick={() => handeVerifyClick(job.id)}
          >
            Verify Employment
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCardCompanies;
