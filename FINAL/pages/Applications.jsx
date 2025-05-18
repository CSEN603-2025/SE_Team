// FINAL/pages/student/Applications.jsx
import React from "react";

const applications = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Vodafone Egypt",
    status: "Finalized"
  },
  {
    id: 2,
    title: "Data Analyst Intern",
    company: "IBM",
    status: "Pending"
  }
];

export default function Applications() {
  return (
    <div>
      <h2>My Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Job Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app.id}>
              <td>{app.company}</td>
              <td>{app.title}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
