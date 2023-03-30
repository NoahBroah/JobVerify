import "../styles/EmployeeDetails.css"

function EmployeeDetails({ employee, onClose, jobs }) {
  const filteredJobs = jobs.filter(
    (job) => job.employee_id === employee.id && job.verifications.length > 0
  );

  return (
    <div className="employee-details">
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <h2>
        {employee.first_name} {employee.last_name}
      </h2>
      <h4>{employee.email}</h4>

      {filteredJobs.length > 0 ? (
        filteredJobs.map((job) => (
          <div key={job.id} className="job">
            <h2>{job.company}</h2>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
        ))
      ) : (
        <h3 className="no-jobs-message">No verified jobs..</h3>
      )}

    </div>
  );
}

export default EmployeeDetails;