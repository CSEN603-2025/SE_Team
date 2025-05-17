import React, { useState } from 'react';
import './SortableApplications.css';

const dummyData = [
  { id: 1, student: 'Mina Adel', company: 'Microsoft', status: 'Pending', date: '2024-05-15' },
  { id: 2, student: 'Laila Hassan', company: 'Vodafone', status: 'Approved', date: '2024-05-15' },
  { id: 3, student: 'Omar Salah', company: 'Orange', status: 'Rejected', date: '2024-05-15' },
  { id: 4, student: 'Yasmin Tarek', company: 'IBM', status: 'Pending', date: '2024-05-15' }
];

const SortableApplications = () => {
  const [sortKey, setSortKey] = useState('student');
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = [...dummyData].sort((a, b) => {
    const compareResult = a[sortKey].localeCompare(b[sortKey]);
    return sortDirection === 'asc' ? compareResult : -compareResult;
  });

  return (
    <div className="sortable-applications">
      <h1>Sort Applications</h1>
      <div className="sort-controls">
        <select className="sort-select" onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="student">Student Name</option>
          <option value="company">Company</option>
          <option value="status">Status</option>
          <option value="date">Date</option>
        </select>
        <button 
          className="sort-direction" 
          onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
        >
          {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      <div className="applications-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student Name</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((app) => (
              <tr key={app.id}>
                <td>{app.date}</td>
                <td>{app.student}</td>
                <td>{app.company}</td>
                <td>
                  <span className={`status-badge ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortableApplications; 