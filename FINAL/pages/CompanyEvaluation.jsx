import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyEvaluation.css';

const CompanyEvaluation = () => {
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState({
    companyName: '',
    overallRating: 5,
    workEnvironment: 5,
    mentorship: 5,
    learningOpportunities: 5,
    recommendation: true,
    pros: '',
    cons: '',
    additionalComments: ''
  });
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);

  useEffect(() => {
    // Check if user has submitted an evaluation before
    const previousEvaluation = localStorage.getItem('companyEvaluation');
    if (previousEvaluation) {
      setHasSubmittedBefore(true);
      setEvaluation(JSON.parse(previousEvaluation));
    }

    // Get current internship details
    const internship = JSON.parse(localStorage.getItem('currentInternship'));
    if (internship) {
      setCurrentInternship(internship);
      setEvaluation(prev => ({
        ...prev,
        companyName: internship.company
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvaluation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (hasSubmittedBefore) {
      alert('You have already submitted an evaluation. Only one evaluation is allowed.');
      return;
    }

    // Save evaluation
    localStorage.setItem('companyEvaluation', JSON.stringify(evaluation));
    setHasSubmittedBefore(true);

    // Navigate back to internships page
    navigate('/my-internships');
  };

  if (hasSubmittedBefore) {
    return (
      <div className="company-evaluation-container">
        <div className="evaluation-submitted">
          <h2>Evaluation Already Submitted</h2>
          <p>You have already submitted an evaluation for {evaluation.companyName}.</p>
          <p>As per the requirements, only one evaluation can be submitted.</p>
          <button onClick={() => navigate('/my-internships')} className="btn primary">
            Return to My Internships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="company-evaluation-container">
      <h1>Company Evaluation</h1>
      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-section">
          <h2>Company Information</h2>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              name="companyName"
              value={evaluation.companyName}
              onChange={handleInputChange}
              required
              disabled={currentInternship}
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Ratings</h2>
          <div className="ratings-grid">
            <div className="rating-item">
              <label>Overall Experience</label>
              <input
                type="range"
                name="overallRating"
                min="1"
                max="5"
                value={evaluation.overallRating}
                onChange={handleInputChange}
              />
              <span>{evaluation.overallRating}/5</span>
            </div>
            <div className="rating-item">
              <label>Work Environment</label>
              <input
                type="range"
                name="workEnvironment"
                min="1"
                max="5"
                value={evaluation.workEnvironment}
                onChange={handleInputChange}
              />
              <span>{evaluation.workEnvironment}/5</span>
            </div>
            <div className="rating-item">
              <label>Mentorship Quality</label>
              <input
                type="range"
                name="mentorship"
                min="1"
                max="5"
                value={evaluation.mentorship}
                onChange={handleInputChange}
              />
              <span>{evaluation.mentorship}/5</span>
            </div>
            <div className="rating-item">
              <label>Learning Opportunities</label>
              <input
                type="range"
                name="learningOpportunities"
                min="1"
                max="5"
                value={evaluation.learningOpportunities}
                onChange={handleInputChange}
              />
              <span>{evaluation.learningOpportunities}/5</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Detailed Feedback</h2>
          <div className="form-group">
            <label>Pros</label>
            <textarea
              name="pros"
              value={evaluation.pros}
              onChange={handleInputChange}
              placeholder="What were the best aspects of your internship?"
              required
            />
          </div>
          <div className="form-group">
            <label>Cons</label>
            <textarea
              name="cons"
              value={evaluation.cons}
              onChange={handleInputChange}
              placeholder="What could be improved?"
              required
            />
          </div>
          <div className="form-group">
            <label>Additional Comments</label>
            <textarea
              name="additionalComments"
              value={evaluation.additionalComments}
              onChange={handleInputChange}
              placeholder="Any other thoughts or feedback?"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="recommendation-group">
            <label>
              <input
                type="checkbox"
                name="recommendation"
                checked={evaluation.recommendation}
                onChange={handleInputChange}
              />
              I recommend this company to other students
            </label>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">Submit Evaluation</button>
          <button 
            type="button" 
            className="btn secondary"
            onClick={() => navigate('/my-internships')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyEvaluation; 