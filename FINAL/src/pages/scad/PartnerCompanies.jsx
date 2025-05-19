import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';

const initialCompanies = [
  { id: 1, name: 'Tech Innovators', email: 'contact@techinnovators.com', industry: 'Software', status: 'pending' },
  { id: 2, name: 'Global Finance Corp', email: 'info@globalfinance.com', industry: 'Finance', status: 'approved' },
  { id: 3, name: 'Green Energy Solutions', email: 'hello@greenenergy.com', industry: 'Energy', status: 'pending' },
  { id: 4, name: 'HealthFirst', email: 'support@healthfirst.com', industry: 'Healthcare', status: 'approved' },
];

export default function PartnerCompanies() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [search, setSearch] = useState('');

  const handleApprove = (id) => {
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  };
  const handleReject = (id) => {
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, status: 'rejected' } : c));
  };
  const handleView = (id) => {
    alert('View details coming soon!');
  };

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Partner Companies">
      <div className="scad-info-section">
        <h2>Company Management</h2>
        <input
          type="text"
          placeholder="Search by name, email, or industry..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: 400 }}
        />
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Industry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(company => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.industry}</td>
                  <td>
                    <span className={`status ${company.status}`}>{company.status.charAt(0).toUpperCase() + company.status.slice(1)}</span>
                  </td>
                  <td>
                    {company.status === 'pending' && (
                      <button className="approve" onClick={() => handleApprove(company.id)}>Approve</button>
                    )}
                    {company.status === 'pending' && (
                      <button className="reject" onClick={() => handleReject(company.id)}>Reject</button>
                    )}
                    <button className="edit" onClick={() => handleView(company.id)}>View</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>No companies found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 