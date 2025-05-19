import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaFileAlt } from 'react-icons/fa';
import { applications } from '../../data/dummyData';

const Applications = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userApplications = applications.filter(app => app.studentId === user.id);

  return (
    <DashboardLayout title="My Applications">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaFileAlt size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>My Applications</h2>
      </div>
      {userApplications.length === 0 ? (
        <div className="empty-state">No applications found.</div>
      ) : (
        <table className="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((app, idx) => (
              <tr key={app.id}>
                <td>{idx + 1}</td>
                <td>{app.status}</td>
                <td>{app.appliedDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export default Applications; 