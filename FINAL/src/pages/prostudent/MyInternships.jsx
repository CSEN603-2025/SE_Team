import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const dummyInternships = [
  {
    id: 1,
    company: 'Amazon',
    title: 'Cloud Intern',
    duration: '3 months',
    status: 'Accepted',
    offerUrl: '#',
    details: 'Worked on AWS Lambda and serverless architectures.'
  },
  {
    id: 2,
    company: 'Google',
    title: 'AI Intern',
    duration: '2 months',
    status: 'Pending',
    offerUrl: '',
    details: 'Assisted in research on natural language processing.'
  },
  {
    id: 3,
    company: 'Microsoft',
    title: 'Web Dev Intern',
    duration: '2 months',
    status: 'Rejected',
    offerUrl: '',
    details: 'Front-end development with React.'
  },
  {
    id: 4,
    company: 'IBM',
    title: 'Data Science Intern',
    duration: '3 months',
    status: 'In Progress',
    offerUrl: '',
    details: 'Data analysis and visualization.'
  }
];

const statusColors = {
  Accepted: '#4F8A8B',
  Pending: '#F9B208',
  Rejected: '#F76E11',
  'In Progress': '#3A6351'
};

export default function MyInternships() {
  const [internships, setInternships] = useState(dummyInternships);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(null);

  const filtered = internships.filter(i =>
    (i.company.toLowerCase().includes(search.toLowerCase()) ||
      i.title.toLowerCase().includes(search.toLowerCase())) &&
    (filter ? i.status === filter : true)
  );

  const handleWithdraw = id => {
    setInternships(internships.map(i =>
      i.id === id ? { ...i, status: 'Withdrawn' } : i
    ));
    setModal(null);
  };

  return (
    <DashboardLayout title="My Internships">
      <div style={{ maxWidth: 950, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>My Internships</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <input
            placeholder="Search by company or title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="modern-input"
            style={{ flex: 1 }}
          />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="modern-input">
            <option value="">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="In Progress">In Progress</option>
            <option value="Withdrawn">Withdrawn</option>
          </select>
        </div>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No internships found.</td></tr>
            ) : filtered.map(i => (
              <tr key={i.id}>
                <td>{i.company}</td>
                <td>{i.title}</td>
                <td>{i.duration}</td>
                <td><span style={{ color: statusColors[i.status] || '#333', fontWeight: 600 }}>{i.status}</span></td>
                <td>
                  <button className="action-button" onClick={() => setModal(i)}>View Details</button>
                  {i.status === 'Pending' && (
                    <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => handleWithdraw(i.id)}>Withdraw</button>
                  )}
                  {i.status === 'Accepted' && i.offerUrl && (
                    <a href={i.offerUrl} download className="action-button" style={{ background: '#3A6351', color: '#fff' }}>Download Offer</a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>{modal.company} - {modal.title}</h3>
              <p><strong>Duration:</strong> {modal.duration}</p>
              <p><strong>Status:</strong> <span style={{ color: statusColors[modal.status] || '#333' }}>{modal.status}</span></p>
              <p><strong>Details:</strong> {modal.details}</p>
              <button className="action-button" onClick={() => setModal(null)} style={{ marginTop: 16 }}>Close</button>
              {modal.status === 'Pending' && (
                <button className="action-button" style={{ background: '#eee', color: '#333', marginLeft: 8 }} onClick={() => handleWithdraw(modal.id)}>Withdraw</button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 