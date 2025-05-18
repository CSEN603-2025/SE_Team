// FINAL/pages/scad/Statistics.jsx
import React from "react";

const stats = {
  acceptedReports: 78,
  rejectedReports: 15,
  flaggedReports: 7,
  topCourses: ["Web Dev", "ML", "OOP"],
  topCompanies: ["Amazon", "Valeo", "ITWorx"]
};

export default function Statistics() {
  return (
    <div>
      <h2>Internship System Statistics</h2>
      <ul>
        <li>Accepted Reports: {stats.acceptedReports}</li>
        <li>Rejected Reports: {stats.rejectedReports}</li>
        <li>Flagged Reports: {stats.flaggedReports}</li>
        <li>Top Courses: {stats.topCourses.join(", ")}</li>
        <li>Top Companies: {stats.topCompanies.join(", ")}</li>
      </ul>
    </div>
  );
}
