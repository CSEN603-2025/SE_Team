// FINAL/pages/faculty/Reports.jsx
import React from "react";

const reports = [
  { id: 1, student: "Sara Adel", major: "CSEN", status: "Pending" },
  { id: 2, student: "Mostafa Kamal", major: "DSEN", status: "Flagged" },
  { id: 3, student: "Lina Gamal", major: "CSEN", status: "Accepted" }
];

export default function Reports() {
  return (
    <div>
      <h2>Submitted Internship Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Major</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(rep => (
            <tr key={rep.id}>
              <td>{rep.student}</td>
              <td>{rep.major}</td>
              <td>{rep.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
