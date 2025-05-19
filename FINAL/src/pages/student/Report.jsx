import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaFileAlt } from 'react-icons/fa';
import { reports } from '../../data/dummyData';

const Report = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userReports = reports.filter(report => report.studentId === user.id);

  return (
    <DashboardLayout title="My Reports">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaFileAlt size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>My Reports</h2>
      </div>
      {userReports.length === 0 ? (
        <div className="empty-state">No reports submitted yet.</div>
      ) : (
        <table className="modern-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Submission Date</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {userReports.map(report => (
              <tr key={report.id}>
                <td>{report.title}</td>
                <td>{report.submissionDate}</td>
                <td>{report.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export default Report; 