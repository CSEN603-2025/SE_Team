// FINAL/pages/scad/Reports.jsx
import React from "react";

const reports = [
  { id: 1, student: "Malak Sherif", title: "Frontend Intern", status: "Accepted" },
  { id: 2, student: "Youssef Nabil", title: "AI Intern", status: "Rejected" },
  { id: 3, student: "Ahmed Saber", title: "DevOps Intern", status: "Pending" }
];

export default function Reports() {
  return (
    <div>
      <h2>All Internship Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.student}</td>
              <td>{r.title}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
