import React from "react";
import DOMPurify from "dompurify";

function JobCardEmployees({ job, setJobs, jobs }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h2 className="job-card-title">{job.title}</h2>
        <span style={{ marginRight: "5px", marginLeft: "5px" }}> at </span>
        <h3 className="job-card-company">{job.company}</h3>
      </div>
      <div className="job-card-body">
        <div
          className="job-card-description"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
        ></div>
        <div className="job-card-details">
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
      </div>
      <div className="job-card-footer">
        {job.verifications.length > 0 ? (
          <div>
            <h3>Verified</h3>
          </div>
        ) : (
          <h3 className="job-card-link">Not Verified</h3>
        )}
      </div>
    </div>
  );
}

export default JobCardEmployees;
