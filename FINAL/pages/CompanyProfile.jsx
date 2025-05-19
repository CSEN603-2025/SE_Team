// FINAL/pages/scad/Companies.jsx
import React from "react";
import DashboardLayout from '../src/components/DashboardLayout';
import { FaBuilding } from 'react-icons/fa';
import '../src/styles/Internships.css';

const companies = [
  { id: 1, name: "Amazon", industry: "Tech", size: "Corporate", status: "Pending" },
  { id: 2, name: "Inertia", industry: "Engineering", size: "Medium", status: "Accepted" },
  { id: 3, name: "Valeo", industry: "Automotive", size: "Large", status: "Rejected" }
];

export default function CompanyProfile() {
  return (
    <DashboardLayout title="Company Profile">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaBuilding size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Company Applications</h2>
      </div>
      <div className="internships-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Industry</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.industry}</td>
                <td>{c.size}</td>
                <td>
                  <span className={`status-badge ${c.status.toLowerCase()}`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
