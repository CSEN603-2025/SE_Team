import React, { useState } from 'react';
import DashboardLayout from '../src/components/DashboardLayout';
import { FaUserGraduate } from 'react-icons/fa';
import '../src/styles/Internships.css';

const dummyInterns = [
  { id: 1, name: 'John Smith', position: 'Software Engineer Intern', start: '2024-01-15', end: '2024-04-15', email: 'john@uni.edu', phone: '123-456-7890', supervisor: 'Jane Doe' },
  { id: 2, name: 'Emily Brown', position: 'Data Science Intern', start: '2024-02-01', end: '', email: 'emily@uni.edu', phone: '987-654-3210', supervisor: 'Mark Lee' }
];

export default function CurrentInterns() {
  const [viewIntern, setViewIntern] = useState(null);
  const [evalIntern, setEvalIntern] = useState(null);
  const [evaluation, setEvaluation] = useState({ rating: 5, comments: '' });

  const handleEvalChange = (e) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({ ...prev, [name]: value }));
  };

  const handleEvalSubmit = (e) => {
    e.preventDefault();
    alert(`Evaluation submitted for ${evalIntern.name}!`);
    setEvalIntern(null);
    setEvaluation({ rating: 5, comments: '' });
  };

  return (
    <DashboardLayout title="Current Interns">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <FaUserGraduate size={28} style={{ marginRight: 12, color: '#4F8A8B' }} />
        <h2 style={{ margin: 0 }}>Current Interns</h2>
      </div>
      <div className="internships-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dummyInterns.map(intern => (
              <tr key={intern.id}>
                <td>{intern.name}</td>
                <td>{intern.position}</td>
                <td>{intern.start}</td>
                <td>{intern.end || 'Present'}</td>
                <td>
                  <button className="action-btn" onClick={() => setViewIntern(intern)}>View</button>
                  <button className="action-btn" onClick={() => setEvalIntern(intern)}>Evaluate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* View Modal */}
      {viewIntern && (
        <div className="modal-overlay" onClick={() => setViewIntern(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>Intern Details</h3>
            <p><b>Name:</b> {viewIntern.name}</p>
            <p><b>Position:</b> {viewIntern.position}</p>
            <p><b>Start Date:</b> {viewIntern.start}</p>
            <p><b>End Date:</b> {viewIntern.end || 'Present'}</p>
            <p><b>Email:</b> {viewIntern.email}</p>
            <p><b>Phone:</b> {viewIntern.phone}</p>
            <p><b>Supervisor:</b> {viewIntern.supervisor}</p>
            <button className="submit-btn" onClick={() => setViewIntern(null)}>Close</button>
          </div>
        </div>
      )}
      {/* Evaluate Modal */}
      {evalIntern && (
        <div className="modal-overlay" onClick={() => setEvalIntern(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3>Evaluate {evalIntern.name}</h3>
            <form onSubmit={handleEvalSubmit} className="report-form">
              <div className="form-group">
                <label>Rating (1-5)</label>
                <input type="number" name="rating" min={1} max={5} value={evaluation.rating} onChange={handleEvalChange} required />
              </div>
              <div className="form-group">
                <label>Comments</label>
                <textarea name="comments" value={evaluation.comments} onChange={handleEvalChange} rows={3} />
              </div>
              <button type="submit" className="submit-btn">Submit Evaluation</button>
              <button type="button" className="action-btn" onClick={() => setEvalIntern(null)} style={{ marginLeft: 8 }}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

/* Add modal styles to Internships.css:
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 2rem 2.5rem;
  min-width: 320px;
  max-width: 95vw;
  position: relative;
}
*/ 