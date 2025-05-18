// FINAL/pages/scad/Companies.jsx
import React from "react";

const companies = [
  { id: 1, name: "Amazon", industry: "Tech", size: "Corporate", status: "Pending" },
  { id: 2, name: "Inertia", industry: "Engineering", size: "Medium", status: "Accepted" },
  { id: 3, name: "Valeo", industry: "Automotive", size: "Large", status: "Rejected" }
];

export default function Companies() {
  return (
    <div>
      <h2>Company Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Industry</th>
            <th>Size</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.industry}</td>
              <td>{c.size}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
