// FINAL/pages/prostudent/Workshops.jsx
import React from "react";

const workshops = [
  {
    id: 1,
    name: "CV Writing 101",
    date: "2025-06-10",
    speaker: "HR at Google",
    description: "Learn how to write professional CVs."
  },
  {
    id: 2,
    name: "Ace the Interview",
    date: "2025-06-20",
    speaker: "Recruiter from Microsoft",
    description: "Interview preparation tips and mock session."
  }
];

export default function Workshops() {
  return (
    <div>
      <h2>Career Workshops</h2>
      {workshops.map(w => (
        <div key={w.id} style={{
          border: "1px solid #aaa",
          padding: "1rem",
          marginBottom: "1rem"
        }}>
          <h3>{w.name}</h3>
          <p><strong>Date:</strong> {w.date}</p>
          <p><strong>Speaker:</strong> {w.speaker}</p>
          <p>{w.description}</p>
          <button>Register</button>
        </div>
      ))}
    </div>
  );
}
