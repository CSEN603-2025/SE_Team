// FINAL/pages/company/Evaluations.jsx
import React, { useState, useEffect } from 'react';
import './Evaluations.css';

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [response, setResponse] = useState('');
  const [selfAssessment, setSelfAssessment] = useState({
    strengths: '',
    improvements: '',
    goals: ''
  });

  useEffect(() => {
    // Load evaluations from localStorage
    const savedEvaluations = JSON.parse(localStorage.getItem('evaluations') || '[]');
    setEvaluations(savedEvaluations);

    // Load self-assessment if evaluation is selected
    if (selectedEvaluation) {
      const savedAssessment = localStorage.getItem(`assessment_${selectedEvaluation.id}`);
      if (savedAssessment) setSelfAssessment(JSON.parse(savedAssessment));
    }
  }, [selectedEvaluation]);

  const handleSubmitResponse = () => {
    if (selectedEvaluation && response.trim()) {
      const updatedEvaluations = evaluations.map(evaluation => {
        if (evaluation.id === selectedEvaluation.id) {
          return {
            ...evaluation,
            studentResponse: response,
            status: 'responded',
            responseDate: new Date().toISOString()
          };
        }
        return evaluation;
      });
      setEvaluations(updatedEvaluations);
      localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
      setResponse('');
    }
  };

  const handleSaveSelfAssessment = () => {
    if (selectedEvaluation) {
      localStorage.setItem(
        `assessment_${selectedEvaluation.id}`,
        JSON.stringify(selfAssessment)
      );

      // Update evaluation status
      const updatedEvaluations = evaluations.map(evaluation => {
        if (evaluation.id === selectedEvaluation.id) {
          return {
            ...evaluation,
            selfAssessmentCompleted: true,
            selfAssessmentDate: new Date().toISOString()
          };
        }
        return evaluation;
      });
      setEvaluations(updatedEvaluations);
      localStorage.setItem('evaluations', JSON.stringify(updatedEvaluations));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA000';
      case 'responded': return '#4CAF50';
      case 'reviewed': return '#1976D2';
      default: return '#757575';
    }
  };

  return (
    <div className="evaluations-container">
      <div className="evaluations-list">
        <h2>Performance Evaluations</h2>
        {evaluations.map(evaluation => (
          <div
            key={evaluation.id}
            className={`evaluation-card ${selectedEvaluation?.id === evaluation.id ? 'selected' : ''}`}
            onClick={() => setSelectedEvaluation(evaluation)}
          >
            <div className="evaluation-header">
              <h3>{evaluation.title}</h3>
              <span
                className="status-badge"
                style={{ backgroundColor: getStatusColor(evaluation.status) }}
              >
                {evaluation.status}
              </span>
            </div>
            <p className="evaluation-date">
              Due: {new Date(evaluation.dueDate).toLocaleDateString()}
            </p>
            <p className="evaluator">By: {evaluation.evaluator}</p>
          </div>
        ))}
      </div>

      {selectedEvaluation && (
        <div className="evaluation-details">
          <h2>{selectedEvaluation.title}</h2>
          <div className="evaluation-section">
            <h3>Evaluation Criteria</h3>
            <div className="criteria-grid">
              {selectedEvaluation.criteria.map(criterion => (
                <div key={criterion.name} className="criterion-card">
                  <h4>{criterion.name}</h4>
                  <p>{criterion.description}</p>
                  <div className="rating">
                    Score: {criterion.score}/5
                    <div className="rating-bar">
                      <div
                        className="rating-fill"
                        style={{ width: `${(criterion.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="evaluation-section">
            <h3>Evaluator Feedback</h3>
            <div className="feedback-content">
              <p>{selectedEvaluation.feedback}</p>
              <div className="feedback-meta">
                <span>Provided by: {selectedEvaluation.evaluator}</span>
                <span>Date: {new Date(selectedEvaluation.feedbackDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="evaluation-section">
            <h3>Self Assessment</h3>
            <div className="self-assessment-form">
              <div className="form-group">
                <label>Key Strengths</label>
                <textarea
                  value={selfAssessment.strengths}
                  onChange={(e) => setSelfAssessment(prev => ({
                    ...prev,
                    strengths: e.target.value
                  }))}
                  placeholder="What are your key strengths in this area?"
                />
              </div>
              <div className="form-group">
                <label>Areas for Improvement</label>
                <textarea
                  value={selfAssessment.improvements}
                  onChange={(e) => setSelfAssessment(prev => ({
                    ...prev,
                    improvements: e.target.value
                  }))}
                  placeholder="What areas would you like to improve?"
                />
              </div>
              <div className="form-group">
                <label>Future Goals</label>
                <textarea
                  value={selfAssessment.goals}
                  onChange={(e) => setSelfAssessment(prev => ({
                    ...prev,
                    goals: e.target.value
                  }))}
                  placeholder="What are your goals for the next period?"
                />
              </div>
              <button onClick={handleSaveSelfAssessment}>Save Self Assessment</button>
            </div>
          </div>

          {selectedEvaluation.status === 'pending' && (
            <div className="evaluation-section">
              <h3>Your Response</h3>
              <div className="response-form">
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Add your response to this evaluation..."
                />
                <button onClick={handleSubmitResponse}>Submit Response</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
