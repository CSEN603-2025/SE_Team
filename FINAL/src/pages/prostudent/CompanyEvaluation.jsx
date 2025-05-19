import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaStar } from 'react-icons/fa';

const dummyCompany = {
  name: 'Amazon',
  internship: 'Cloud Intern',
};

export default function CompanyEvaluation() {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [recommend, setRecommend] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout title="Company Evaluation">
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Company Evaluation</h2>
        {submitted ? (
          <div style={{ textAlign: 'center', color: '#3A6351', fontWeight: 600, fontSize: 20 }}>
            Thank you for your feedback!<br />
            You have submitted your evaluation for {dummyCompany.name}.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <b>Company:</b> {dummyCompany.name}<br />
              <b>Internship:</b> {dummyCompany.internship}
            </div>
            <div>
              <b>Rating:</b><br />
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  size={28}
                  color={star <= rating ? '#F9B208' : '#E8F6EF'}
                  style={{ cursor: 'pointer', marginRight: 4 }}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <div>
              <b>Feedback:</b><br />
              <textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="Share your experience..."
                className="modern-input"
                style={{ minHeight: 80 }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={recommend} onChange={e => setRecommend(e.target.checked)} />
                I recommend this company to other students
              </label>
            </div>
            <button className="action-button" type="submit">Submit Evaluation</button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
} 