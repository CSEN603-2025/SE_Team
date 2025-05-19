import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import '../../styles/ScadDashboard.css';

const initialInternships = [
  { id: 1, title: 'Frontend Intern', company: 'Tech Innovators', duration: '3 months', status: 'pending' },
  { id: 2, title: 'Finance Analyst', company: 'Global Finance Corp', duration: '6 months', status: 'approved' },
  { id: 3, title: 'Energy Researcher', company: 'Green Energy Solutions', duration: '4 months', status: 'pending' },
  { id: 4, title: 'Healthcare Assistant', company: 'HealthFirst', duration: '2 months', status: 'approved' },
];

export default function InternshipPrograms() {
  const [internships, setInternships] = useState(initialInternships);
  const [search, setSearch] = useState('');

  const handleApprove = (id) => {
    setInternships(is => is.map(i => i.id === id ? { ...i, status: 'approved' } : i));
  };
  const handleReject = (id) => {
    setInternships(is => is.map(i => i.id === id ? { ...i, status: 'rejected' } : i));
  };
  const handleView = (id) => {
    alert('View details coming soon!');
  };

  const filtered = internships.filter(i =>
    i.title.toLowerCase().includes(search.toLowerCase()) ||
    i.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Internship Programs">
      <div className="scad-info-section">
        <h2>Internship Programs</h2>
        <input
          type="text"
          placeholder="Search by title or company..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: 400 }}
        />
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(internship => (
                <tr key={internship.id}>
                  <td>{internship.title}</td>
                  <td>{internship.company}</td>
                  <td>{internship.duration}</td>
                  <td>
                    <span className={`status ${internship.status}`}>{internship.status.charAt(0).toUpperCase() + internship.status.slice(1)}</span>
                  </td>
                  <td>
                    {internship.status === 'pending' && (
                      <button className="approve" onClick={() => handleApprove(internship.id)}>Approve</button>
                    )}
                    {internship.status === 'pending' && (
                      <button className="reject" onClick={() => handleReject(internship.id)}>Reject</button>
                    )}
                    <button className="edit" onClick={() => handleView(internship.id)}>View</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center' }}>No internships found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 