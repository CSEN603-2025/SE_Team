// ReportClarification.jsx
import React, { useState } from 'react';
import './ReportClarification.css';

const ReportClarification = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className="report-clarification">
      <h3>Submit Clarification</h3>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Explain why the report was flagged or rejected..."
      />
      <button onClick={handleSubmit}>Submit Clarification</button>
    </div>
  );
};

export default ReportClarification;