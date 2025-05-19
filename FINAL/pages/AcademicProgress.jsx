import React from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaGraduationCap } from 'react-icons/fa';
import '../src/styles/Internships.css';

const courses = [
  { code: 'CSEN101', name: 'Intro to CS', grade: 'A', credits: 3 },
  { code: 'CSEN201', name: 'Data Structures', grade: 'A-', credits: 3 },
  { code: 'CSEN301', name: 'Databases', grade: 'B+', credits: 3 },
  { code: 'CSEN401', name: 'AI', grade: 'A', credits: 3 }
];

const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
const completedCredits = courses.length * 3;
const progress = Math.round((completedCredits / 120) * 100); // Assume 120 credits for degree

export default function AcademicProgress() {
  return (
    <DashboardLayout title="Academic Progress">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaGraduationCap size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Academic Progress</h2>
      </div>
      <div className="internships-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>Grade</th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.code}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td>{course.grade}</td>
                <td>{course.credits}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 24 }}>
          <label style={{ fontWeight: 600 }}>Degree Progress:</label>
          <div style={{ background: '#E8F6EF', borderRadius: 8, height: 24, width: '100%', marginTop: 8 }}>
            <div style={{ background: '#4F8A8B', width: `${progress}%`, height: '100%', borderRadius: 8, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 