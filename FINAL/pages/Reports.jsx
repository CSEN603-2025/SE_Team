// FINAL/pages/student/Reports.jsx
import React, { useState } from "react";

export default function Reports() {
  const [report, setReport] = useState({
    title: "",
    introduction: "",
    body: ""
  });

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted! (not actually saved)");
  };

  return (
    <div>
      <h2>My Internship Report</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={report.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="introduction"
          placeholder="Introduction"
          value={report.introduction}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={report.body}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}
