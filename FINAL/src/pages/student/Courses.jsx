import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaBook } from 'react-icons/fa';

const Courses = () => {
  const dummyCourses = [
    { id: 1, code: 'CSEN401', name: 'Computer Programming Lab', credits: 2 },
    { id: 2, code: 'CSEN402', name: 'Computer Programming', credits: 3 },
    { id: 3, code: 'CSEN403', name: 'Digital Design', credits: 3 }
  ];

  return (
    <DashboardLayout title="My Courses">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaBook size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>My Courses</h2>
      </div>
      <table className="modern-table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Name</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {dummyCourses.map(course => (
            <tr key={course.id}>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default Courses; 