// WorkshopFeedback.jsx
import React, { useState } from 'react';
import './WorkshopFeedback.css';

const WorkshopFeedback = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit({ rating, feedback });
      setRating(0);
      setFeedback('');
    }
  };

  return (
    <div className="workshop-feedback">
      <h3>Workshop Feedback</h3>
      <div className="rating-section">
        <p>How would you rate this workshop?</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="feedback-section">
        <label>Additional Feedback (optional):</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="What did you like or dislike about the workshop?"
        />
      </div>
      <button onClick={handleSubmit}>Submit Feedback</button>
    </div>
  );
};

export default WorkshopFeedback;