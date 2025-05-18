// FINAL/pages/company/Applicants.jsx
import React from "react";

const applicants = [
  { id: 1, name: "Laila Hassan", post: "Frontend Intern", status: "Pending" },
  { id: 2, name: "Omar Nasser", post: "Backend Intern", status: "Finalized" }
];

export default function Applicants() {
  return (
    <div>
      <h2>Internship Applicants</h2>
      <table>
        <thead>
          <tr>
            <th>Applicant</th>
            <th>Post</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(app => (
            <tr key={app.id}>
              <td>{app.name}</td>
              <td>{app.post}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
