// FINAL/pages/faculty/Students.jsx
import React from "react";

const students = [
  { id: 1, name: "Nour El-Din", internshipStatus: "Internship Complete" },
  { id: 2, name: "Aya Hossam", internshipStatus: "Current Intern" },
  { id: 3, name: "Ziad Mahmoud", internshipStatus: "Internship Complete" }
];

export default function Students() {
  return (
    <div>
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Internship Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map(st => (
            <tr key={st.id}>
              <td>{st.name}</td>
              <td>{st.internshipStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
