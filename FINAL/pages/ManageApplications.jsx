import React, { useState } from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaUsers } from 'react-icons/fa';
import '../src/styles/Internships.css';

const dummyApplications = [
  { id: 1, student: 'John Smith', position: 'Software Engineer Intern', date: '2024-03-15', status: 'Under Review' },
  { id: 2, student: 'Emily Brown', position: 'Data Science Intern', date: '2024-03-14', status: 'Accepted' },
  { id: 3, student: 'Michael Wilson', position: 'Frontend Developer Intern', date: '2024-03-13', status: 'Interviewing' }
];

export default function ManageApplications() {
  const [applications, setApplications] = useState(dummyApplications);

  const handleStatus = (id, status) => {
    setApplications(apps => apps.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <DashboardLayout title="Manage Applications">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaUsers size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Applications</h2>
      </div>
      <div className="internships-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Position</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.student}</td>
                <td>{app.position}</td>
                <td>{app.date}</td>
                <td><span className={`status-badge ${app.status.replace(/\s/g, '').toLowerCase()}`}>{app.status}</span></td>
                <td>
                  <button className="action-btn" onClick={() => handleStatus(app.id, 'Accepted')}>Accept</button>
                  <button className="action-btn" onClick={() => handleStatus(app.id, 'Rejected')}>Reject</button>
                  <button className="action-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
} 