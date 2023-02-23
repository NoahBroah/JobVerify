import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "../styles/CreateNewJob.css";

const CreateNewJob = ({ jobs, setJobs }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [verified, setVerified] = useState(false);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    const newJob = {
      company: company,
      title: title,
      description: description,
    };

    fetch("/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    })
      .then((resp) => resp.json())
      .then((newJob) => {
        if (newJob?.errors) {
          setErrors([newJob.errors]);
          console.log("Yikes");
        } else {
          console.log("hey");
          setJobs([...jobs, newJob]);
          history.push("/");
        }
      });
  }

  return (
    <div className="create-job-container">
      <form onSubmit={handleSubmit}>
        <h2>Create New Job</h2>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Position"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <textarea
            id="todolist"
            className="form-control"
            name="todolist"
            rows="10"
            placeholder="Maintain your pending tasks"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateNewJob;
