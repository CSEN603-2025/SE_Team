import React from 'react';
import studentsData from '../data/students.json';

function StudentProfile({ studentId }) {
  // Look up the student by ID
  const student = studentsData.find(s => s.id === studentId);
  if (!student) {
    return <div>Student not found.</div>;
  }

  return (
    <div className="student-profile">
      <h2>{student.name}</h2>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Major:</strong> {student.major}</p>
      <p><strong>Current Semester:</strong> {student.currentSemester}</p>
      <p><strong>Interests:</strong> {student.interests.join(', ')}</p>
      <h3>Internship History</h3>
      <ul>
        {student.internshipHistory.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
        {student.internshipHistory.length === 0 && (
          <li>No prior internships.</li>
        )}
      </ul>
    </div>
  );
}

export default StudentProfile;
