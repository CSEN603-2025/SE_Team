import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaSearch, FaFilter, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../styles/FacultyDashboard.css'; // For modern styles
import Loader from '../../components/Loader';
import ConfirmDialog from '../../components/ConfirmDialog';

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
  const [activeFilters, setActiveFilters] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleAddFilter = (type, value, label) => {
    if (!value || value === '' || value === 'all' || activeFilters.some(f => f.type === type && f.value === value)) return;
    setActiveFilters([...activeFilters, { type, value, label }]);
  };

  const handleRemoveFilter = (type, value) => {
    setActiveFilters(activeFilters.filter(f => !(f.type === type && f.value === value)));
    if (type === 'status') setFilter('');
    if (type === 'search') setSearch('');
  };

  const handleClearAll = () => {
    setActiveFilters([]);
    setFilter('');
    setSearch('');
  };

  const filtered = internships.filter(i => {
    let matches = true;
    activeFilters.forEach(f => {
      if (f.type === 'search') {
        matches = matches && (
          i.company.toLowerCase().includes(f.value.toLowerCase()) ||
          i.title.toLowerCase().includes(f.value.toLowerCase())
        );
      }
      if (f.type === 'status') {
        matches = matches && i.status === f.value;
      }
    });
    return matches;
  });

  const handleWithdrawClick = (internship) => {
    setConfirmTarget(internship);
    setConfirmOpen(true);
  };

  const handleConfirmWithdraw = () => {
    // Here you would update the internship status in state or API
    setConfirmOpen(false);
    setConfirmTarget(null);
    // Optionally show a toast here
  };

  return (
    <DashboardLayout title="My Internships">
      {loading && <Loader />}
      <ConfirmDialog
        open={confirmOpen}
        title="Withdraw Application"
        message={`Are you sure you want to withdraw your application for '${confirmTarget?.company}'? This action cannot be undone.`}
        onConfirm={handleConfirmWithdraw}
        onCancel={() => setConfirmOpen(false)}
      />
      <div style={{ maxWidth: 950, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>My Internships</h2>
        <div className="modern-search-section creative-filter-bar">
          <div className="filter-bar-horizontal">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by company or title..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  handleAddFilter('search', e.target.value, `Search: ${e.target.value}`);
                }}
                onBlur={e => e.target.value && handleAddFilter('search', e.target.value, `Search: ${e.target.value}`)}
              />
            </div>
            <div className="date-range">
              <FaCalendarAlt className="filter-icon" />
              <input
                type="date"
                name="from"
                value={dateRange?.from || ''}
                onChange={e => {
                  setDateRange(prev => ({ ...prev, from: e.target.value }));
                  handleAddFilter('dateFrom', e.target.value, `From: ${e.target.value}`);
                }}
              />
              <span>to</span>
              <input
                type="date"
                name="to"
                value={dateRange?.to || ''}
                onChange={e => {
                  setDateRange(prev => ({ ...prev, to: e.target.value }));
                  handleAddFilter('dateTo', e.target.value, `To: ${e.target.value}`);
                }}
              />
            </div>
            <div className="status-filter">
              <FaFilter className="filter-icon" />
              <select value={filter} onChange={e => {
                setFilter(e.target.value);
                if (e.target.value) handleAddFilter('status', e.target.value, `Status: ${e.target.options[e.target.selectedIndex].text}`);
              }}>
                <option value="">All Statuses</option>
                <option value="Accepted">Accepted</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="In Progress">In Progress</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>
            <button className="clear-btn modern-action-btn" onClick={handleClearAll}>Clear All</button>
          </div>
          <TransitionGroup className="active-filters">
            {activeFilters.map(f => (
              <CSSTransition key={f.type + f.value} timeout={200} classNames="tag">
                <span className="filter-tag">
                  {f.label}
                  <FaTrash className="remove-tag" onClick={() => handleRemoveFilter(f.type, f.value)} />
                </span>
              </CSSTransition>
            ))}
          </TransitionGroup>
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
                <td><span className={`status-badge ${i.status.replace(/\s/g, '').toLowerCase()}`}>{i.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" onClick={() => setModal(i)}>View Details</button>
                    {i.status === 'Pending' && (
                      <button className="action-btn reject" onClick={() => handleWithdrawClick(i)}>Withdraw</button>
                    )}
                    {i.status === 'Accepted' && i.offerUrl && (
                      <a href={i.offerUrl} download className="action-btn download">Download Offer</a>
                    )}
                  </div>
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
                <button className="action-button" style={{ background: '#eee', color: '#333', marginLeft: 8 }} onClick={() => handleWithdrawClick(modal)}>Withdraw</button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 