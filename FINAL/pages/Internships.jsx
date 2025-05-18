// FINAL/pages/prostudent/Internships.jsx
import React from "react";

const internships = [
  {
    id: 1,
    company: "Orange Digital Center",
    title: "Mobile App Developer",
    duration: "2 months",
    paid: true,
    salary: "6000 EGP",
    description: "Work with Flutter to build cross-platform apps.",
    status: "Current"
  },
  {
    id: 2,
    company: "Dell Technologies",
    title: "IT Support Intern",
    duration: "1 month",
    paid: false,
    salary: null,
    description: "Provide software and hardware support for internal teams.",
    status: "Completed"
  }
];

export default function Internships() {
  return (
    <div>
      <h2>My Internships</h2>
      {internships.map(intern => (
        <div key={intern.id} style={{
          border: "1px solid #ccc",
          marginBottom: "1rem",
          padding: "1rem",
          borderRadius: "6px"
        }}>
          <h3>{intern.title} @ {intern.company}</h3>
          <p><strong>Duration:</strong> {intern.duration}</p>
          <p><strong>Status:</strong> {intern.status}</p>
          <p><strong>Paid:</strong> {intern.paid ? `Yes (${intern.salary})` : "No"}</p>
          <p>{intern.description}</p>
        </div>
      ))}
    </div>
  );
}
