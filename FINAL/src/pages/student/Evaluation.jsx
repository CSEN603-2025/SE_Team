import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaClipboardCheck } from 'react-icons/fa';

const Evaluation = () => {
  const [evaluation, setEvaluation] = useState({
    companyName: '',
    internshipPeriod: '',
    supervisorName: '',
    technicalSkills: 5,
    communication: 5,
    teamwork: 5,
    punctuality: 5,
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle evaluation submission
    console.log('Evaluation submitted:', evaluation);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <DashboardLayout title="Internship Evaluation">
      <div className="form-card">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <FaClipboardCheck size={28} style={{ marginRight: 12, color: '#F76E11' }} />
          <h2 style={{ margin: 0 }}>Internship Evaluation</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={evaluation.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="internshipPeriod">Internship Period:</label>
            <input
              type="text"
              id="internshipPeriod"
              name="internshipPeriod"
              value={evaluation.internshipPeriod}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="supervisorName">Supervisor Name:</label>
            <input
              type="text"
              id="supervisorName"
              name="supervisorName"
              value={evaluation.supervisorName}
              onChange={handleChange}
            />
          </div>

          <div className="ratings">
            <h3>Performance Ratings (1-10)</h3>
            <div className="rating-group">
              <label htmlFor="technicalSkills">Technical Skills:</label>
              <input
                type="range"
                id="technicalSkills"
                name="technicalSkills"
                min="1"
                max="10"
                value={evaluation.technicalSkills}
                onChange={handleChange}
              />
              <span>{evaluation.technicalSkills}</span>
            </div>
            <div className="rating-group">
              <label htmlFor="communication">Communication:</label>
              <input
                type="range"
                id="communication"
                name="communication"
                min="1"
                max="10"
                value={evaluation.communication}
                onChange={handleChange}
              />
              <span>{evaluation.communication}</span>
            </div>
            <div className="rating-group">
              <label htmlFor="teamwork">Teamwork:</label>
              <input
                type="range"
                id="teamwork"
                name="teamwork"
                min="1"
                max="10"
                value={evaluation.teamwork}
                onChange={handleChange}
              />
              <span>{evaluation.teamwork}</span>
            </div>
            <div className="rating-group">
              <label htmlFor="punctuality">Punctuality:</label>
              <input
                type="range"
                id="punctuality"
                name="punctuality"
                min="1"
                max="10"
                value={evaluation.punctuality}
                onChange={handleChange}
              />
              <span>{evaluation.punctuality}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comments">Additional Comments:</label>
            <textarea
              id="comments"
              name="comments"
              value={evaluation.comments}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-btn">Submit Evaluation</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Evaluation; 