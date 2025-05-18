import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    category: 'general',
    title: '',
    description: '',
    rating: 5
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission
    console.log('Feedback submitted:', feedback);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="win98-container">
      <div className="title-bar">
        <div className="title-bar-text">Submit Feedback</div>
      </div>
      
      <div className="window-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={feedback.category}
              onChange={handleChange}
            >
              <option value="general">General</option>
              <option value="technical">Technical</option>
              <option value="ui">User Interface</option>
              <option value="support">Support</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={feedback.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={feedback.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <div className="rating-input">
              <input
                type="range"
                id="rating"
                name="rating"
                min="1"
                max="10"
                value={feedback.rating}
                onChange={handleChange}
              />
              <span>{feedback.rating}/10</span>
            </div>
          </div>

          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback; 