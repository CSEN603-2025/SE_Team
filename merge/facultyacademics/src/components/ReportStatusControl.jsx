// ReportStatusControl.jsx
import React, { useState } from 'react';
import './ReportStatusControl.css';

const ReportStatusControl = ({ currentStatus, onStatusChange }) => {
  const [status, setStatus] = useState(currentStatus);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onStatusChange(status, comment);
  };

  return (
    <div className="status-control">
      <h3>Update Report Status</h3>
      <div className="status-options">
        <label>
          <input 
            type="radio" 
            name="status" 
            value="accepted" 
            checked={status === 'accepted'} 
            onChange={() => setStatus('accepted')} 
          />
          Accepted
        </label>
        <label>
          <input 
            type="radio" 
            name="status" 
            value="flagged" 
            checked={status === 'flagged'} 
            onChange={() => setStatus('flagged')} 
          />
          Flagged
        </label>
        <label>
          <input 
            type="radio" 
            name="status" 
            value="rejected" 
            checked={status === 'rejected'} 
            onChange={() => setStatus('rejected')} 
          />
          Rejected
        </label>
      </div>
      <div className="status-comment">
        <label>Comments (required for Flagged/Rejected):</label>
        <textarea 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          required={status === 'flagged' || status === 'rejected'}
        />
      </div>
      <button onClick={handleSubmit}>Update Status</button>
    </div>
  );
};

export default ReportStatusControl;