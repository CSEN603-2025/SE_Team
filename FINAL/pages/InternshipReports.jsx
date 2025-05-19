import React from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaFileAlt } from 'react-icons/fa';
import '../src/styles/Internships.css';

const dummyReports = [
  { id: 1, student: 'John Smith', title: 'Software Project', date: '2024-04-01' },
  { id: 2, student: 'Emily Brown', title: 'Data Science Analysis', date: '2024-03-28' }
];

export default function InternshipReports() {
  return (
    <DashboardLayout title="Internship Reports">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaFileAlt size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Internship Reports</h2>
      </div>
      <div className="internships-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyReports.map(report => (
              <tr key={report.id}>
                <td>{report.student}</td>
                <td>{report.title}</td>
                <td>{report.date}</td>
                <td>
                  <button className="action-btn">View</button>
                  <button className="action-btn">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
} 