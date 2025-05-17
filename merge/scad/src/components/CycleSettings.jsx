// src/components/CycleSettings.jsx
import React, { useState } from 'react';
import './CycleSettings.css';

export default function CycleSettings() {
  const [startDate, setStartDate] = useState('');
  const [endDate,   setEndDate]   = useState('');
  const [feedback, setFeedback]   = useState(null);
  const [error, setError]         = useState(null);

  const handleSave = () => {
    if (!startDate || !endDate) {
      setError('Both start and end dates are required.');
      setFeedback(null);
      return;
    }
    if (endDate < startDate) {
      setError('End date cannot be before start date.');
      setFeedback(null);
      return;
    }
    setError(null);
    setFeedback('Cycle saved successfully!');
    setTimeout(() => setFeedback(null), 2000);
    // In a real app you'd POST this to your backend.
  };

  return (
    <div className="cycle-settings-card">
      <h2>Internship Cycle Settings</h2>
      <div className="helper-text">Set the start and end dates for the current internship cycle. These dates will be used for all related deadlines and processes.</div>
      <form className="cycle-form" onSubmit={e => { e.preventDefault(); handleSave(); }}>
        <div className="cycle-fields">
          <label htmlFor="cycle-start">Start Date</label>
          <input
            id="cycle-start"
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            aria-label="Cycle start date"
          />
        </div>
        <div className="cycle-fields">
          <label htmlFor="cycle-end">End Date</label>
          <input
            id="cycle-end"
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            aria-label="Cycle end date"
          />
        </div>
        {error && <div className="cycle-error" role="alert">{error}</div>}
        {feedback && <div className="cycle-feedback" role="status">{feedback}</div>}
        <button
          type="submit"
          className="save-btn"
          disabled={!startDate || !endDate || endDate < startDate}
          aria-label="Save cycle settings"
        >
          Save Cycle
        </button>
      </form>
    </div>
  );
}
