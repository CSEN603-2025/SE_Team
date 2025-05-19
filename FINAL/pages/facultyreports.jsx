// FINAL/pages/faculty/Reports.jsx
import React, { useState } from "react";
import { FaEye, FaCheck, FaFlag, FaComments } from 'react-icons/fa';

const reports = [
  { id: 1, student: "Sara Adel", major: "CSEN", status: "Pending", title: "Weekly Report", content: "Summary of week 1..." },
  { id: 2, student: "Mostafa Kamal", major: "DSEN", status: "Flagged", title: "Final Report", content: "Final project summary..." },
  { id: 3, student: "Lina Gamal", major: "CSEN", status: "Accepted", title: "Monthly Report", content: "Month in review..." }
];

export default function FacultyReports() {
  const [modal, setModal] = useState(null); // {mode: 'view'|'comment', report: {...}}
  const [comment, setComment] = useState('');

  const handleAccept = (id) => {
    // Dummy accept logic
    alert('Report accepted!');
  };
  const handleFlag = (id) => {
    // Dummy flag logic
    alert('Report flagged!');
  };
  const handleComment = (id) => {
    setModal({ mode: 'comment', report: reports.find(r => r.id === id) });
  };
  const handleSubmitComment = () => {
    alert('Comment submitted: ' + comment);
    setComment('');
    setModal(null);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Submitted Internship Reports</h2>
      <table className="modern-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Student</th>
            <th>Major</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(rep => (
            <tr key={rep.id}>
              <td>{rep.student}</td>
              <td>{rep.major}</td>
              <td>{rep.title}</td>
              <td>{rep.status}</td>
              <td style={{ display: 'flex', gap: 8 }}>
                <button className="action-button" title="View" onClick={() => setModal({ mode: 'view', report: rep })}><FaEye /></button>
                <button className="action-button" title="Accept" onClick={() => handleAccept(rep.id)}><FaCheck /></button>
                <button className="action-button" title="Flag" style={{ background: '#eee', color: '#333' }} onClick={() => handleFlag(rep.id)}><FaFlag /></button>
                <button className="action-button" title="Comment" onClick={() => handleComment(rep.id)}><FaComments /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal && modal.mode === 'view' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
            <h3>{modal.report.title}</h3>
            <div style={{ marginBottom: 12 }}><b>Student:</b> {modal.report.student}</div>
            <div style={{ marginBottom: 12 }}><b>Major:</b> {modal.report.major}</div>
            <div style={{ marginBottom: 12 }}><b>Status:</b> {modal.report.status}</div>
            <div style={{ marginBottom: 12 }}><b>Content:</b><br />{modal.report.content}</div>
            <button className="action-button" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      )}
      {modal && modal.mode === 'comment' && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
            <h3>Submit Comment for {modal.report.student}</h3>
            <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter your comment..." className="modern-input" style={{ minHeight: 80, width: '100%' }} />
            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
              <button className="action-button" onClick={handleSubmitComment}>Submit</button>
              <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={() => setModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
