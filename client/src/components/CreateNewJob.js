import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

import "../styles/CreateNewJob.css";

const CreateNewJob = ({ jobs, setJobs }) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [verified, setVerified] = useState(false);
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [errors, setErrors] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
  const contentHTML = draftToHtml(convertToRaw(contentState));

  const newJob = {
    company: company,
    title: title,
    description: contentHTML,
    from_date: fromDate,
    to_date: toDate
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
        } else {
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
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            toolbarClassName="toolbar-class"
          />
        </div>

        <div className="form-group">
          <label>Dates</label>
          <div className="form-inline">
            <input
              type="month"
              className="form-control mr-3"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
            <input
              type="month"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateNewJob;
